import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { NgFor, NgForOf, CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// import { NgStyle } from "angular2/common";
interface btnType { id: number, x: number, y: number, text: string }
@Component({
  selector: 'app-drag-btn',
  templateUrl: './drag-btn.component.html',
  styleUrls: ['./styles/drag-btn.component.css'],
  standalone: true,
  imports: [CommonModule, CdkDrag, MatIconModule, MatButtonToggleModule, NgForOf, MatFormFieldModule, MatSelectModule, NgFor, MatInputModule, FormsModule],
})
export class DragBtnComponent {
  private id = 0;
  public isButtonDragged = false;
  clickedElement: any = ''
  // Get the ID attribute of the clicked element
  elementId: string = ''
  e: any = ''
  btnList: any[] = [];
  textContent: String | null = ''
  fontSize: string = ''
  fontFamily: String = ''
  fontStyle: String[] = []
  vertical: String = ''
  position: String = ''
  textPosition: String = ''
  fontWeight: number = 0
  backgroundColor = ''
  font = [
    'Lora',
    'Lavishly Yours',
    'Caveat',
    'Lobster',
    'Pacifico',
    'Comic Sans Ms',
    'Times New Roman',
    'Roboto',
    'Poppins',
    'Lato',
    'Arial',
    'Noto Serif',
    'Serif',
    'Georgia',
    'Cursive'
  ]
  constructor(private elementRef: ElementRef) {
  }
  ngOnInit(): void {

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const item = localStorage.getItem(key);
        if (item !== null) {
          const value = JSON.parse(item)
          this.btnList.push({
            id: parseInt(key),
            x: value.x,
            y: value.y,
            fontSize: value.fontSize,
            justifyContent: value.justifyContent,
            alignItems: value.alignItems,
            text: value.value,
            color: value.color,
            fontFamily: value.fontFamily,
            backgroundColor: value.backgroundColor,
            fontWeight: value.fontWeight,
            fontStyle: value.fontStyle,
            textDecoration: value.textDecoration,
          });
        }
      }
    }
    this.id = this.btnList.length
    // return keys;
  }

  addDragBtn() {
    const btn: any = { id: this.id, x: 50, y: 50, text: "button" }
    this.btnList.push(btn);
    localStorage.setItem(this.id.toString(), JSON.stringify({ x: btn.x, y: btn.y }));
    this.id += 1
  }



  onDragEnded(event: CdkDragEnd, id: number) {
    const element = event.source.element.nativeElement;
    const rect = element.getBoundingClientRect();
    localStorage.setItem(id.toString(), JSON.stringify({ x: rect.left + window.scrollX, y: rect.top + window.scrollY }));
  }

  handleButtonClick(event: MouseEvent) {
    this.fontStyle = []
    this.clickedElement = event.target as HTMLElement;
    // Get the ID attribute of the clicked element
    this.elementId = this.clickedElement.id;
    this.e = document.getElementById(this.elementId)
    if (this.e !== null) {
      // Get CSS attributes
      const computedStyles = window.getComputedStyle(this.e);
      const backgroundColor = computedStyles.getPropertyValue('background-color');
      const fontSize = computedStyles.getPropertyValue('font-size');
      const fontFamily = computedStyles.getPropertyValue('font-family');
      const textAlign = computedStyles.getPropertyValue('justify-content');
      const textPosition = computedStyles.getPropertyValue('align-items');
      const fontStyle = computedStyles.getPropertyValue('font-style');
      const textUnderline = computedStyles.getPropertyValue('text-decoration-line');
      const fontWeight = computedStyles.getPropertyValue('font-weight');
      const color = computedStyles.getPropertyValue('color');
      // computedStyles.setProperty('color','black')
      // xet value cho thanh tuy chon
      this.textContent = this.e.textContent
      this.fontSize = fontSize.slice(0, -2)
      this.fontFamily = fontFamily
      this.textPosition = textPosition
      this.fontStyle.push(fontStyle)
      this.fontStyle.push(textUnderline)
      if (this.fontWeight > 400) {
        this.fontStyle.push("bold")
      }
      this.vertical = textAlign
      this.position = ''
      this.fontWeight = parseInt(fontWeight)

      this.backgroundColor = backgroundColor
    }
  }
  changeTextContent(event: any) {
    this.e.textContent = event
    this.update('value', event)


  }

  changeFontSize(event: any) {
    let size = event.target.value + 'px'
    this.e.style.fontSize = size
    this.update('fontSize', size)
  }

  changeFontFamily(event: any) {
    this.e.style.fontFamily = event.value + ",sans-serif"
    this.update('fontFamily', event.value + ",sans-serif")

  }

  changeFontStyle(event: any) {
    // Xet ve vi tri ban dau
    this.e.style.fontWeight = 400
    this.e.style.fontStyle = "normal"
    this.e.style.textDecoration = "none"
    this.update('fontWeight', '400')
    this.update('fontStyle', "normal")
    this.update('textDecoration', "none")
    for (var i = 0; i < event.length; i++) {
      if (event[i] == "bold") {
        this.e.style.fontWeight = 700
        this.update('fontWeight', '700')
      }

      if (event[i] == "underline") {
        this.e.style.textDecoration = "underline"
        this.update('textDecoration', "underline")
      }

      if (event[i] == "italic") {
        this.e.style.fontStyle = "italic"
        this.update('fontStyle', "italic")
      }
    }
  }

  changVertical(event: any) {
    this.e.style.justifyContent = event
    this.update('justifyContent', event)
  }

  changePosition(event: any) {
    this.e.style.alignItems = event
    this.update('alignItems', event)
  }
  // update localstorage
  update(key: string, value: string) {
    let item = localStorage.getItem(this.elementId);
    if (item != null) {
      let newValue = JSON.parse(item)
      newValue[`${key}`] = value
      localStorage.setItem(this.elementId, JSON.stringify(newValue));
    }
  }
}
