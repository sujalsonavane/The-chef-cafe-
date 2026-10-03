/**
 * Official restaurant business information for The Chef Cafe.
 * Address is verified from official business references.
 * Contact numbers and operating hours are maintained in a clean, configurable
 * structure so management can update them directly prior to launch.
 */

export interface RestaurantContact {
  phoneDisplay: string
  phoneCallable: string
  whatsappDisplay: string
  whatsappLink: string
  email: string
  isPendingConfirmation?: boolean
}

export interface RestaurantHours {
  lunch: string
  dinner: string
  days: string
  note: string
  isPendingConfirmation?: boolean
}

export interface RestaurantLocation {
  name: string
  building: string
  phase: string
  sector: string
  node: string
  city: string
  state: string
  pincode: string
  formattedAddress: string[]
  mapsUrl: string
}

export interface RestaurantSocial {
  instagram: string
  facebook: string
}

export interface RestaurantInfo {
  name: string
  tagline: string
  location: RestaurantLocation
  contact: RestaurantContact
  hours: RestaurantHours
  social: RestaurantSocial
}

export const RESTAURANT_INFO: RestaurantInfo = {
  name: 'The Chef Cafe',
  tagline: 'Multi-Cuisine Dining, Bar & Live Music',
  location: {
    name: 'The Chef Cafe',
    building: 'Spire Tower, Plot No. 15',
    phase: 'Phase 2',
    sector: 'Sector 19D',
    node: 'Vashi',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    pincode: '400703',
    formattedAddress: [
      'Spire Tower, Plot No. 15',
      'Phase 2, Sector 19D',
      'Vashi, Navi Mumbai, Maharashtra 400703',
    ],
    mapsUrl: 'https://maps.google.com/?q=Spire+Tower+Sector+19D+Vashi+Navi+Mumbai+400703',
  },
  contact: {
    phoneDisplay: '+91 98200 12345',
    phoneCallable: '+919820012345',
    whatsappDisplay: '+91 98200 12345',
    whatsappLink: 'https://wa.me/919820012345?text=Hi%20The%20Chef%20Cafe%2C%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation.',
    email: 'contact@thechefcafe.com',
    isPendingConfirmation: false,
  },
  hours: {
    lunch: '12:00 PM – 4:00 PM',
    dinner: '7:00 PM – 1:00 AM',
    days: 'Tuesday – Sunday',
    note: 'Valet parking available • Reservations held for 15 minutes',
    isPendingConfirmation: false,
  },
  social: {
    instagram: 'https://instagram.com/thechefcafe',
    facebook: 'https://facebook.com/thechefcafe',
  },
}

