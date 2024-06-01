export class PaypalError {
  status: number;
  name: string;
  message: string;
  debug_id: string;
  details: Details[];
  links: Links[];

  constructor(
    status: number,
    name: string,
    message: string,
    debug_id: string,
    details: Details[],
    links: Links[],
  ) {
    this.status = status;
    this.name = name;
    this.message = message;
    this.debug_id = debug_id;
    this.details = details;
    this.links = links;
  }
}

class Details {
  field?: string;
  value?: string;
  location?: string;
  issue: string;
  description: string;
}

class Links {
  href: string;
  rel: string;
  method: string;
}
