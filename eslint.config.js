import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/node_modules/", "**/dist/", "**/target/", "**/.venv/", "data/", "ml/"],
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  prettier,
);
