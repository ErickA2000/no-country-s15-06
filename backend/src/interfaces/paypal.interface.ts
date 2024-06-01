export interface CreateSubscription {
  plan_id: string;
  start_time?: Date;
  quantity?: string;
  shipping_amount?: ShippingAmount;
  subscriber?: Subscriber;
  application_context?: ApplicationContext;
}

export interface ApplicationContext {
  brand_name?: string;
  locale?: string;
  shipping_preference?: string;
  user_action?: string;
  payment_method?: PaymentMethod;
  return_url: string;
  cancel_url: string;
}

export interface PaymentMethod {
  payer_selected: string;
  payee_preferred: string;
}

export interface ShippingAmount {
  currency_code: string;
  value: string;
}

export interface Subscriber {
  name?: SubscriberName;
  email_address?: string;
  shipping_address?: ShippingAddress;
}

export interface SubscriberName {
  given_name?: string;
  surname?: string;
}

export interface ShippingAddress {
  name: ShippingAddressName;
  address: Address;
}

export interface Address {
  address_line_1: string;
  address_line_2: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
}

export interface ShippingAddressName {
  full_name: string;
}

//* Response subscription

export interface ResponseSubscription {
  id: string;
  status: string;
  status_update_time: Date;
  plan_id: string;
  plan_overridden: boolean;
  start_time: Date;
  quantity: string;
  shipping_amount: ShippingAmount;
  subscriber: Subscriber;
  create_time: Date;
  links: Link[];
}

interface Link {
  href: string;
  rel: string;
  method: string;
}

export interface ResponseAuth {
  scope: string;
  access_token: string;
  token_type: string;
  app_id: string;
  expires_in: number;
  nonce: string;
}

//* Response show subscription

export interface ShowSubscription {
  status: string;
  status_update_time: Date;
  id: string;
  plan_id: string;
  start_time: Date;
  quantity: string;
  shipping_amount: ShippingAmount;
  subscriber: Subscriber;
  billing_info: BillingInfo;
  create_time: Date;
  update_time: Date;
  plan_overridden: boolean;
  links: Link[];
}

export interface BillingInfo {
  outstanding_balance: ShippingAmount;
  cycle_executions: CycleExecution[];
  last_payment: LastPayment;
  next_billing_time: Date;
  failed_payments_count: number;
}

export interface CycleExecution {
  tenure_type: string;
  sequence: number;
  cycles_completed: number;
  cycles_remaining: number;
  current_pricing_scheme_version: number;
  total_cycles: number;
}

export interface LastPayment {
  amount: ShippingAmount;
  time: Date;
}

//* Response cancel subscription from paypal
export interface PaypalCancelledSubscription {
  id: string;
  create_time: string;
  event_type: string;
  event_version: string;
  resource_type: string;
  resource_version: string;
  summary: string;
  resource: Resource;
  links: Link[];
}

export interface Resource {
  id: string;
  status: string;
  status_update_time: Date;
  plan_id: string;
  start_time: Date;
  quantity: string;
  shipping_amount: ShippingAmount;
  subscriber: Subscriber;
  auto_renewal: boolean;
  billing_info: BillingInfo2;
  create_time: Date;
  update_time: Date;
  links: Link[];
}

export interface BillingInfo2 {
  outstanding_balance: ShippingAmount;
  cycle_executions: CycleExecution[];
  last_payment: LastPayment;
  next_billing_time: Date;
  final_payment_time: Date;
  failed_payments_count: number;
}
