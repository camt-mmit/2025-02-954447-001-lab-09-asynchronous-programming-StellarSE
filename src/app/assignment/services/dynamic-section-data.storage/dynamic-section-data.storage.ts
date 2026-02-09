import { APP_ID, Injectable, inject } from '@angular/core';
import { DynamicSection } from '../../types'; // แก้จาก '../' เป็น '../../'

const keyId = 'dynamic-section-data';

@Injectable({
  providedIn: 'root',
})
export class DynamicSectionDataStorage {
  // ใช้ inject(APP_ID) เพื่อสร้าง key ที่ไม่ซ้ำกันตามแบบอย่างใน ProfileDataStorage
  private readonly keyName = `${inject(APP_ID)}-${keyId}` as const;

  // เปลี่ยนจาก Observable เป็น async/await ตามหลัก Non-Blocking ในบทเรียน
  async get(): Promise<DynamicSection | null> {
    const data = localStorage.getItem(this.keyName);
    return data ? JSON.parse(data) : null;
  }

  async set(data: DynamicSection): Promise<void> {
    localStorage.setItem(this.keyName, JSON.stringify(data));
  }
}
