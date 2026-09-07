import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { createClient } from "@supabase/supabase-js";

const args = new Map();
for (let index = 2; index < process.argv.length; index += 1) {
    const argument = process.argv[index];
    if (argument.startsWith("--")) {
        args.set(argument.slice(2), process.argv[index + 1]);
        index += 1;
    }
}

const prompt = readline.createInterface({ input, output });
const email = (args.get("email") || process.env.SEED_ADMIN_EMAIL || await prompt.question("Admin email: "))
    .trim()
    .toLowerCase();
const password = args.get("password") || process.env.SEED_ADMIN_PASSWORD || await prompt.question("Admin password: ");
prompt.close();

if (!email || !password) {
    throw new Error("An admin email and password are required.");
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY must be set in .env.local.");
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY, { auth: { autoRefreshToken: false, persistSession: false } },
);

let existingUser = null;
let page = 1;

while (!existingUser) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;

    existingUser = data.users.find((user) => user.email ? .toLowerCase() === email) || null;
    if (!data.nextPage || data.nextPage === page) break;
    page = data.nextPage;
}

if (existingUser) {
    const { error } = await supabase.auth.admin.updateUserById(existingUser.id, {
        password,
        user_metadata: {...existingUser.user_metadata, role: "admin" },
    });
    if (error) throw error;
    console.log(`Promoted ${email} to admin and updated its password.`);
} else {
    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { role: "admin" },
    });
    if (error) throw error;
    console.log(`Created admin ${data.user.email}.`);
}

console.log("The account can now sign in at /login and manage users at /admin/users.");