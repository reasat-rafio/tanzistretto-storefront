import { db } from '$lib/server/db/db.js';
import { address } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function PUT({ request }) {
  const { id } = await request.json();

  try {
    const addressExists = await db.query.address.findFirst({
      where: eq(address.id, id),
    });

    if (!addressExists)
      return json({ message: 'Address not found' }, { status: 404 });

    const isDefaultAddress = addressExists.isDefault;
    if (!isDefaultAddress) {
      const currentDefaultAddress = await db.query.address.findFirst({
        where: eq(address.isDefault, true),
      });

      if (currentDefaultAddress) {
        await db
          .update(address)
          .set({ isDefault: false })
          .where(eq(address.id, currentDefaultAddress.id));
      }

      await db
        .update(address)
        .set({ isDefault: true })
        .where(eq(address.id, id));
      return json({ message: 'Address set as default' });
    }

    return json({ message: 'Address is already set as default' });
  } catch (error) {
    console.log(error);
    return json({ message: 'Failed to delete address' }, { status: 500 });
  }
}
