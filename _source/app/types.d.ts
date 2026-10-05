declare module "*.module.css" { const classes: Record<string, string>; export default classes; }
declare module "next" { export type Metadata = Record<string, unknown>; }
