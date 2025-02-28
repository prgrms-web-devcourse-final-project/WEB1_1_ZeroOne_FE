export type HljsLangType = keyof typeof hljsLangModules;

export const hljsLangModules = {
  plaintext: () => import('highlight.js/lib/languages/plaintext.js'),
  javascript: () => import('highlight.js/lib/languages/javascript.js'),
  typescript: () => import('highlight.js/lib/languages/typescript.js'),
  python: () => import('highlight.js/lib/languages/python.js'),
  java: () => import('highlight.js/lib/languages/java.js'),
  c: () => import('highlight.js/lib/languages/c.js'),
  cpp: () => import('highlight.js/lib/languages/cpp.js'),
  csharp: () => import('highlight.js/lib/languages/csharp.js'),
  php: () => import('highlight.js/lib/languages/php.js'),
  go: () => import('highlight.js/lib/languages/go.js'),
  swift: () => import('highlight.js/lib/languages/swift.js'),
  kotlin: () => import('highlight.js/lib/languages/kotlin.js'),
  ruby: () => import('highlight.js/lib/languages/ruby.js'),
  sql: () => import('highlight.js/lib/languages/sql.js'),
  bash: () => import('highlight.js/lib/languages/bash.js'),
  json: () => import('highlight.js/lib/languages/json.js'),
} as const;
