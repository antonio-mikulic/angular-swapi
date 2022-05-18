export class MenuItem {
  route: string;
  name: string;
  icon: string;

  constructor(route: string, name: string, icon: string) {
    this.route = route;
    this.name = name;
    this.icon = icon;
  }
}
