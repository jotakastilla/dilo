export const orderStates = ['draft', 'awaiting-review', 'approved', 'preparing', 'shipped', 'cancelled'] as const;
export type OrderState = (typeof orderStates)[number];

const validTransitions: Record<OrderState, readonly OrderState[]> = {
  draft: ['awaiting-review', 'cancelled'],
  'awaiting-review': ['approved', 'cancelled'],
  approved: ['preparing', 'cancelled'],
  preparing: ['shipped'],
  shipped: [],
  cancelled: [],
};

export function canTransitionOrder(from: OrderState, to: OrderState) {
  return validTransitions[from].includes(to);
}
