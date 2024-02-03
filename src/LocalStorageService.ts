export class LocalStorageService {
  static setItem(key: string, content: unknown) {
    localStorage.setItem(key, JSON.stringify(content));
  }

  static getItem<T>(key: string): T | undefined {
    return JSON.parse(localStorage.getItem(key) as string) || undefined;
  }
}
