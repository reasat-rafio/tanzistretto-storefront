import { db } from '$lib/server/db/db.js';
import { address } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { count, eq, ne } from 'drizzle-orm';

export async function DELETE({ request }) {
  const { id } = await request.json();

  try {
    const addressExists = await db.query.address.findFirst({
      where: eq(address.id, id),
    });

    if (!addressExists)
      return json({ message: 'Address not found' }, { status: 404 });

    const isDefaultAddress = addressExists.isDefault;
    if (!isDefaultAddress) {
      await db.delete(address).where(eq(address.id, id));
      return json({ message: 'Address deleted' });
    }

    const totalNumberOfUserAddress = await db
      .select({ value: count() })
      .from(address)
      .where(eq(address.userId, addressExists.userId));

    if (totalNumberOfUserAddress[0].value === 1) {
      await db.delete(address).where(eq(address.id, id));
      return json({ message: 'Address deleted' });
    } else {
      const findFirstAddressWhichIsNotDefault =
        await db.query.address.findFirst({
          where: ne(address.id, id),
        });

      if (!findFirstAddressWhichIsNotDefault) {
        return json(
          { message: 'Failed to delete address. Please try again' },
          { status: 500 },
        );
      }

      await db
        .update(address)
        .set({ isDefault: true })
        .where(eq(address.id, findFirstAddressWhichIsNotDefault.id));
      await db.delete(address).where(eq(address.id, id));

      return json({ message: 'Address deleted' });
    }
  } catch (error) {
    console.log(error);
    return json({ message: 'Failed to delete address' }, { status: 500 });
  }
}
