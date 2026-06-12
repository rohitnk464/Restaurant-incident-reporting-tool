const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sampleIncidents = [
  {
    title: 'POS Terminal #3 Unresponsive',
    description: 'The POS terminal at register 3 has been freezing intermittently since the morning shift. It crashes when processing card payments, forcing staff to redirect customers to other registers. This has caused significant delays during the lunch rush with wait times exceeding 15 minutes.',
    category: 'POS Issue',
    storeLocation: 'California Burrito — Downtown LA',
    severity: 'High',
    status: 'Open',
    reportedAt: new Date('2026-06-12T11:30:00'),
  },
  {
    title: 'Guacamole Supply Running Low',
    description: 'Our avocado shipment from the supplier was only half of what was ordered. Current guacamole stock will last approximately 4 more hours at current demand rate. Need emergency restock or we will have to stop serving guac-based items by dinner service.',
    category: 'Inventory',
    storeLocation: 'California Burrito — Santa Monica',
    severity: 'Critical',
    status: 'In Progress',
    reportedAt: new Date('2026-06-12T09:15:00'),
  },
  {
    title: 'DoorDash Orders Delayed 30+ Minutes',
    description: 'Multiple DoorDash delivery orders have been sitting on the shelf for over 30 minutes with no driver assignment. We have received 5 complaints from customers about cold food. The DoorDash tablet is showing a driver shortage in our area.',
    category: 'Delivery Delay',
    storeLocation: 'California Burrito — San Diego',
    severity: 'Medium',
    status: 'Open',
    reportedAt: new Date('2026-06-12T12:45:00'),
  },
  {
    title: 'Deep Fryer #2 Temperature Malfunction',
    description: 'The deep fryer on station 2 is not maintaining proper oil temperature. It drops to 250°F when it should be at 350°F. All fried items (chips, churros, crispy tacos) have been redirected to fryer #1, creating a bottleneck during peak hours.',
    category: 'Kitchen Equipment',
    storeLocation: 'California Burrito — Downtown LA',
    severity: 'High',
    status: 'In Progress',
    reportedAt: new Date('2026-06-11T14:20:00'),
  },
  {
    title: 'Customer Found Hair in Burrito',
    description: 'A customer at table 7 found a hair in their California Burrito. The customer was very upset and demanded a full refund. Manager on duty provided a refund and a complimentary meal voucher. Need to reinforce hair net policy with all kitchen staff.',
    category: 'Customer Complaint',
    storeLocation: 'California Burrito — San Francisco',
    severity: 'High',
    status: 'Resolved',
    reportedAt: new Date('2026-06-11T19:30:00'),
  },
  {
    title: 'Walk-in Cooler Temperature Rising',
    description: 'Walk-in cooler temperature has risen from the normal 38°F to 48°F over the past 2 hours. The compressor is making unusual noises. If not fixed immediately, we risk spoiling approximately $2,000 worth of perishable ingredients including meats, dairy, and produce.',
    category: 'Kitchen Equipment',
    storeLocation: 'California Burrito — Oakland',
    severity: 'Critical',
    status: 'Open',
    reportedAt: new Date('2026-06-12T08:00:00'),
  },
  {
    title: 'Salsa Bar Needs Restocking',
    description: 'The self-service salsa bar has been empty for the last hour during dinner rush. Multiple customers have complained. The kitchen team is backed up with orders and hasnt had time to prep fresh salsas. Need additional prep staff for peak hours.',
    category: 'Inventory',
    storeLocation: 'California Burrito — Santa Monica',
    severity: 'Low',
    status: 'Resolved',
    reportedAt: new Date('2026-06-10T18:45:00'),
  },
  {
    title: 'Card Reader Not Accepting Tap Payments',
    description: 'The contactless payment reader at the drive-through window stopped accepting tap and Apple Pay transactions around 2 PM. Customers are being asked to insert their cards instead, which is slowing down the drive-through line considerably.',
    category: 'POS Issue',
    storeLocation: 'California Burrito — San Diego',
    severity: 'Medium',
    status: 'Closed',
    reportedAt: new Date('2026-06-10T14:10:00'),
  },
  {
    title: 'Uber Eats Tablet Offline',
    description: 'The Uber Eats tablet went offline and we missed approximately 12 orders over the past hour. Customers are leaving negative reviews on the platform. We have tried restarting the tablet and reconnecting to WiFi but the issue persists.',
    category: 'Delivery Delay',
    storeLocation: 'California Burrito — San Francisco',
    severity: 'High',
    status: 'Resolved',
    reportedAt: new Date('2026-06-11T11:00:00'),
  },
  {
    title: 'Slip and Fall Near Drink Station',
    description: 'A customer slipped on a wet floor near the drink station. No serious injuries reported but the customer was shaken. The area had been mopped but the wet floor sign was knocked over. Need to review safety protocols and signage placement.',
    category: 'Other',
    storeLocation: 'California Burrito — Oakland',
    severity: 'Medium',
    status: 'Closed',
    reportedAt: new Date('2026-06-09T16:30:00'),
  },
];

async function main() {
  console.log('🌯 Seeding California Burrito incidents database...');
  
  for (const incident of sampleIncidents) {
    await prisma.incident.create({ data: incident });
    console.log(`  ✅ Created: ${incident.title}`);
  }

  console.log(`\n🎉 Seeded ${sampleIncidents.length} incidents successfully!`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
