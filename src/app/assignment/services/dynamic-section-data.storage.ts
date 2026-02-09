import { APP_ID, Injectable, inject } from '@angular/core';
import { DynamicSection } from '../types';

const keyId = 'dynamic-section-data';

@Injectable({ providedIn: 'root' })
export class DynamicSectionDataStorage {
  private readonly keyName = `${inject(APP_ID)}-${keyId}` as const;

  async get(): Promise<DynamicSection | null> {
    // เปลี่ยนเป็น sessionStorage เพื่อความเป็นระเบียบของ session งาน
    const data = sessionStorage.getItem(this.keyName);
    return data ? JSON.parse(data) : null;
  }

  async set(data: DynamicSection): Promise<void> {
    sessionStorage.setItem(this.keyName, JSON.stringify(data));
  }
}
