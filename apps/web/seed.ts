/**
 * ! Executing this script will delete all data in your database and seed it with test data.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";
import { Client } from "pg";

const main = async () => {
  const seed = await createSeedClient();

  // Get direct database connection to update public.users after creation
  const client = new Client({
    connectionString: "postgresql://postgres:postgres@localhost:54322/postgres",
  });
  await client.connect();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  const productId = "prod_TGzX9thAYYjRkc";

  // Create 1 product
  await seed.products((x) =>
    x(1, {
      id: productId,
      active: true,
      name: "Premium",
      description: "Premium resume services",
      metadata: {},
    }),
  );

  // Create 2 prices for the product (one-time and recurring)
  await seed.prices((x) =>
    x(1, {
      id: "price_1SKRY05ZkS7lhGClRT9n7d5r",
      product_id: productId,
      active: true,
      unit_amount: 1500,
      currency: "usd",
      type: "one_time",
      metadata: {},
    }),
  );

  await seed.prices((x) =>
    x(1, {
      id: "price_1SKRaI5ZkS7lhGClnT9xJMHn",
      product_id: productId,
      active: true,
      unit_amount: 3000,
      currency: "usd",
      type: "recurring",
      interval: "month",
      interval_count: 1,
      metadata: {},
    }),
  );

  // Create 5 users with auth and public records, and one order each
  const userEmails = [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com",
    "user4@example.com",
    "user5@example.com",
  ];

  for (let i = 0; i < userEmails.length; i++) {
    const email = userEmails[i];
    const uniqueId = `${Date.now()}_${i}_${Math.random().toString(36).substring(2, 9)}`;

    // Create auth user (trigger will auto-create public.users with NULL stripe_customer_id)
    await seed.auth_users((x) =>
      x(1, {
        email,
        email_confirmed_at: new Date().toISOString(),
        raw_app_meta_data: { provider: "email", providers: ["email"] },
        raw_user_meta_data: { email, email_verified: true, phone_verified: false },
        orders: (x) =>
          x(1, {
            email: email,
            package_slug: productId,
            stripe_checkout_session_id: `cs_test_${uniqueId}_session`,
            stripe_payment_intent_id: `pi_test_${uniqueId}_intent`,
            amount: 1500,
            currency: "usd",
            status: "paid",
            metadata: {
              priceId: "price_1SKRY05ZkS7lhGClRT9n7d5r",
              package_slug: productId,
            },
          }),
      }),
    );

    // Update public.users with stripe_customer_id using the email to find the user
    await client.query(
      "UPDATE public.users SET stripe_customer_id = $1 WHERE id = (SELECT id FROM auth.users WHERE email = $2)",
      [`cus_test_${uniqueId}`, email],
    );
  }

  await client.end();

  console.log("Database seeded successfully!");
  console.log(`- Created 1 product with 2 prices`);
  console.log(`- Created ${userEmails.length} users (auth + public)`);
  console.log(`- Created ${userEmails.length} orders (1 per user)`);

  process.exit();
};

main();
