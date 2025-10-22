export type IPVersion = 'ipv4' | 'ipv6';

export class IP {
  ipAddress: string;

  constructor(ip: string) {
    this.ipAddress = ip;
  }
}

export interface NetworkInfoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  getCurrentIp(): Promise<IP>;
}
