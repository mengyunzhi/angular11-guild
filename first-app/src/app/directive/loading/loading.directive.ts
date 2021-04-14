import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective {

  constructor(private elementRef: ElementRef) {
    const htmlButtonElement = elementRef.nativeElement as HTMLButtonElement;
    htmlButtonElement.addEventListener('click', () => {
      this.buttonOnClick(htmlButtonElement);
    });
  }

  buttonOnClick(htmlButtonElement: HTMLButtonElement): void {
    // 隐藏原图标
    const svgElement = htmlButtonElement.querySelector('svg') as SVGElement;
    svgElement.style.display = 'none';

    // 生成小齿轮，并添加到button中
    const loadingElement = document.createElement('i') as HTMLElement;
    loadingElement.classList.add('fas');
    loadingElement.classList.add('fa-cog');
    loadingElement.classList.add('fa-spin');
    htmlButtonElement.insertBefore(loadingElement, svgElement);

    // 禁用按钮
    htmlButtonElement.disabled = true;
  }
}
