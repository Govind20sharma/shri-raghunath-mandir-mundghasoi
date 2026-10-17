export class CmsError extends Error {
  constructor(public status: number, message: string, public code = "cms_error") {
    super(message);
    this.name = "CmsError";
  }
}
