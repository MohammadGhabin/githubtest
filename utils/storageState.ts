export type storageStateObject = {
  /**
   * cookies to set for context
   */
  cookies: Array<{
    name: string;

    value: string;

    /**
     * domain and path are required
     */
    domain: string;

    /**
     * domain and path are required
     */
    path: string;

    /**
     * Unix time in seconds.
     */
    expires: number;

    httpOnly: boolean;

    secure: boolean;

    /**
     * sameSite flag
     */
    sameSite: "Strict" | "Lax" | "None";
  }>;

  /**
   * localStorage to set for context
   */
  origins: Array<{
    origin: string;

    localStorage: Array<{
      name: string;

      value: string;
    }>;
  }>;
};
