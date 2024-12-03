/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(dispense-food)/add-schedule` | `/(dispense-food)/delete-schedule` | `/(dispense-food)/edit-schedule` | `/(dispense-water)/add-schedule` | `/(dispense-water)/delete-schedule` | `/(dispense-water)/edit-schedule` | `/(home)/add-device` | `/(home)/my-profile` | `/(home)/notifications` | `/(my-profile)/about-us` | `/(my-profile)/edit-profile` | `/(my-profile)/faq` | `/(pet-details)/edit-john` | `/(pet-details)/edit-oyen` | `/(pet-details)/edit-ujang` | `/(pet-profile)/add-pet-details` | `/(pet-profile)/edit-pet-details` | `/(pet-profile)/john` | `/(pet-profile)/oyen` | `/(pet-profile)/ujang` | `/(tabs)` | `/(tabs)/dispense-schedule` | `/(tabs)/homepage` | `/(tabs)/pet-profile` | `/_sitemap` | `/about-us` | `/add-device` | `/add-pet-details` | `/add-schedule` | `/auth/forgot-password` | `/auth/login` | `/auth/sign-in` | `/auth/sign-up` | `/delete-schedule` | `/dispense-schedule` | `/edit-john` | `/edit-oyen` | `/edit-pet-details` | `/edit-profile` | `/edit-schedule` | `/edit-ujang` | `/faq` | `/homepage` | `/john` | `/my-profile` | `/notifications` | `/oyen` | `/pet-profile` | `/ujang`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
