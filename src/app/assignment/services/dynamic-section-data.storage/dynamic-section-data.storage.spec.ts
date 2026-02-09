import { APP_ID, Injectable, inject } from '@angular/core';
import { DynamicSection } from '../../types'; // อ้างอิง Path ให้ถูกต้อง

@Injectable({ providedIn: 'root' })
export class DynamicSectionDataStorage {
  // ใช้ inject(APP_ID) เพื่อสร้าง Key ที่ไม่ซ้ำกันสำหรับแอป [cite: 261]
  private readonly keyName = `${inject(APP_ID)}-dynamic-data` as const;

  // อ่านข้อมูลแบบ Async [cite: 262-264]
  async get(): Promise<DynamicSection | null> {
    const data = localStorage.getItem(this.keyName);
    return data ? JSON.parse(data) : null;
  }

  // บันทึกข้อมูลแบบ Async [cite: 265-267]
  async set(data: DynamicSection): Promise<void> {
    localStorage.setItem(this.keyName, JSON.stringify(data));
  }
}
