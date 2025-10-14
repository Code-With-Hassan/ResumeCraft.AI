/**
 * @fileOverview Mock implementation of the Google AdSense ad network.
 */

import { AdNetwork } from './AdNetwork';

export class GoogleAdSense implements AdNetwork {
  async showRewardedAd(): Promise<boolean> {
    // In a real application, you would integrate the Google AdSense SDK here.
    // For this mock, we will simulate the ad-watching process.
    console.log('Simulating Google AdSense rewarded ad...');
    
    // We'll use a promise that resolves after a short delay to mimic an ad playing.
    return new Promise(resolve => {
      setTimeout(() => {
        // We can add logic here to simulate ad-related events, like the user closing the ad early.
        // For now, we'll assume the user always watches the ad completely.
        const adWatchedSuccessfully = true;
        
        if (adWatchedSuccessfully) {
          console.log('Google AdSense ad watched successfully.');
          resolve(true);
        } else {
          console.log('Ad was skipped or failed to load.');
          resolve(false);
        }
      }, 1500); // Simulate a 1.5-second ad
    });
  }
}
