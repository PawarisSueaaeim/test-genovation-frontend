import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    js.configs.recommended,
    {
        plugins: ["prettier", "@typescript-eslint"],
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: "module",
                ecmaVersion: "latest",
            },
        },
        rules: {
            "prettier/prettier": "error",
            
            // ปิด warning ของ react-hooks/exhaustive-deps
            "react-hooks/exhaustive-deps": "off",

            // อนุญาตให้ใช้ {} เป็น type
            "@typescript-eslint/no-empty-object-type": "off",

            // อนุญาตให้ใช้ any
            "@typescript-eslint/no-explicit-any": "off",

            // ปิด error ที่เกิดจากตัวแปรที่ไม่ได้ใช้ (เปลี่ยนเป็น warning)
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },
];

export default eslintConfig;
