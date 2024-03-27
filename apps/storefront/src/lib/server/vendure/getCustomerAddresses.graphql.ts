import { gql } from '$lib/generated';
import { query } from '.';

export const getCustomerAddresses = async function (locals: App.Locals) {
  const GetCustomerAddresses = gql(`
		query GetCustomerAddresses {
			activeCustomer {
				id
				addresses {
					id
					fullName
					company
					streetLine1
					streetLine2
					city
					province
					postalCode
					country {
						code
						name
					}
					phoneNumber
					defaultShippingAddress
					defaultBillingAddress
				}
			}
		}
	`);
  return await query({ document: GetCustomerAddresses, locals })
    .then((response) => response?.json())
    .then((body) => body?.data?.activeCustomer?.addresses)
    .catch(() => {
      return null;
    });
};
