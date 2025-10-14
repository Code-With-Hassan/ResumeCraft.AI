/**
 * @fileOverview Factory for creating ad network instances.
 */

import type { AdNetwork } from './AdNetwork';
import { GoogleAdSense } from './GoogleAdSense';

export type AdNetworkType = 'GoogleAdSense';

export class AdFactory {
  /**
   * Returns an instance of the specified ad network.
   * @param networkType The type of ad network to get.
   * @returns An instance of the AdNetwork.
   */
  static getAdNetwork(networkType: AdNetworkType): AdNetwork {
    switch (networkType) {
      case 'GoogleAdSense':
        return new GoogleAdSense();
      default:
        // This ensures that if we add new network types, we handle them.
        const exhaustiveCheck: never = networkType;
        throw new Error(`Ad network type "${exhaustiveCheck}" is not supported.`);
    }
  }
}
