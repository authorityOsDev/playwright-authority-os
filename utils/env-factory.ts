// utils/env-factory.ts

export class EnvFactory {
  /**
   * Returns the current environment name
   */
  static get currentEnv(): string {
    return (process.env.ENV || 'staging').toLowerCase();
  }

  /**
   * Returns the Base URL based on environment
   */
  static get baseUrl(): string {
    if (process.env.BASE_URL) return process.env.BASE_URL;

    switch (this.currentEnv) {
      case 'prod': return 'https://www.saucedemo.com';
      case 'dev': return 'https://dev.saucedemo.com'; // Example dev URL
      default: return 'https://www.saucedemo.com';
    }
  }
}