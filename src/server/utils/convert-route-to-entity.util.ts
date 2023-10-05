const mapping: Record<string, string> = {
  gyms: 'gym',
  'gym-members': 'gym_member',
  'gym-trainers': 'gym_trainer',
  nutritionists: 'nutritionist',
  'training-courses': 'training_course',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
