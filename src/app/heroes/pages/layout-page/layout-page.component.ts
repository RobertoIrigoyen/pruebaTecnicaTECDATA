import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent {
  public menuItems = [
    {
      label: 'Listado', icon: 'label', url: './list'
    },
    {
      label: 'Añadir', icon: 'add', url: './new-hero'
    },
    {
      label: 'Buscar', icon: 'search', url: './search'
    },
  ]
}
