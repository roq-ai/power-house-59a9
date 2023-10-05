interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Gym Trainer', 'Gym Member', 'Nutritionist', 'Guest User'],
  tenantName: 'Gym',
  applicationName: 'Power House',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage user information',
    'Manage gym details',
    'Manage gym members',
    'Manage gym trainers',
    'Manage nutritionists',
    'Manage training courses',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/a248855c-b209-445e-b2b0-60775a744608',
};
