/**
 * @fileOverview Defines the interface for an ad network.
 */

export interface AdNetwork {
  /**
   * Shows a rewarded ad to the user.
   * @returns A promise that resolves to true if the ad was successfully watched, and false otherwise.
   */
  showRewardedAd(): Promise<boolean>;
}
