export const W = 1600, H = 900, CH = 44; // app size inside the browser window, chrome bar height
export const SIDE = 232, TOPH = 56;
export const NAV: [string, string][] = [['home', 'ផ្ទាំងគ្រប់គ្រង'], ['cal', 'ព្រឹត្តិការណ៍'], ['pin', 'ទីកន្លែង'], ['user', 'អធិបតី'], ['tasks', 'តួនាទីអធិបតី'], ['file', 'បញ្ជីឯកសារ'], ['clip', 'វត្តមាន'],
  ['users', 'អ្នកប្រើប្រាស់'], ['shield', 'តួនាទី និងសិទ្ធិ'], ['list', 'សំណើ'], ['hist', 'កំណត់ត្រាសកម្មភាព'], ['gear', 'ការកំណត់']];
/** centre of a sidebar item, in WINDOW coordinates (chrome bar included) */
export const navXY = (i: number) => ({x: 96, y: CH + (i < 7 ? 128 + i * 38 : 432 + (i - 7) * 38) + 17});
export const CX = SIDE + 28, CY = TOPH + 26; // content origin inside the app
