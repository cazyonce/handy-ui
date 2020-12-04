import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { ElementToolService } from 'src/app/domain/ui-factory/core/service/component/element-tool.service';

@Component({
  selector: 'adjust',
  templateUrl: './adjust.component.html',
  styleUrls: ['./adjust.component.css']
})
export class AdjustComponent implements OnInit {

  // 0上左 1上中 2上右 3 左中 4右中 5下左 6下中 7下右
  @ViewChild('adjust', { read: ElementRef }) adjust: ElementRef;

  // 对象实例 this.panelElement.nativeElement
  @Input("panel") panelElement: any;
  // @ViewChild('vc', { read: ElementRef }) panelElement: ElementRef;

  constructor(private render2: Renderer2, private toolService: ElementToolService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.processAdjust();

    this.render2.listen(this.adjust.nativeElement, "mousedown", (event) => {
      var distanceBorderX = null; // 存储第一次移动时，鼠标X与选框left的距离
      var distanceBorderY = null; // 存储第一次移动时，鼠标Y与选框top的距离

      console.log("2222222222")
      this.onDragAdjust(event, (event2) => {
        var pos = this.adjust.nativeElement.getBoundingClientRect();
        if (distanceBorderX == null) { // 第一次移动时不需要处理移动，计算鼠标与选框left距离
          distanceBorderX = event2.clientX - pos.left
          distanceBorderY = event2.clientY - pos.top
          return;
        }

        // 计算当前鼠标X与初始的选框left位置实际移动的距离
        var diffLeft = event2.clientX - distanceBorderX - pos.left;
        var panelElementPos = this.panelElement.getBoundingClientRect();
        var moveLeft = this.adjust.nativeElement.offsetLeft + diffLeft;
        if (moveLeft > panelElementPos.width - pos.width) {
          moveLeft = panelElementPos.width - pos.width;
          // 选框碰到画布边框时，更新鼠标与选框的间距
          distanceBorderX = event2.clientX - pos.left
        } else if (moveLeft < 0) {
          moveLeft = 0;
          // 选框碰到画布边框时，更新鼠标与选框的间距
          distanceBorderX = event2.clientX - pos.left
        }
        this.render2.setStyle(this.adjust.nativeElement, "left", moveLeft + "px");

        // 计算当前鼠标Y与初始的选框top位置实际移动的距离
        var diffTop = event2.clientY - distanceBorderY - pos.top;
        var moveTop = this.adjust.nativeElement.offsetTop + diffTop;
        if (moveTop > panelElementPos.height - pos.height) {
          moveTop = panelElementPos.height - pos.height;
          // 选框碰到画布边框时，更新鼠标与选框的间距
          distanceBorderY = event2.clientY - pos.top
        } else if (moveTop < 0) {
          moveTop = 0;
          // 选框碰到画布边框时，更新鼠标与选框的间距
          distanceBorderY = event2.clientY - pos.top
        }
        this.render2.setStyle(this.adjust.nativeElement, "top", moveTop + "px");
      })
      // this.onDragAdjust(event, (event2) => {
      //   var pos = this.adjust.nativeElement.getBoundingClientRect();
      //   var eventClientX = this.processMoveBeyondX(event2.clientX);
      //   var eventClientY = this.processMoveBeyondY(event2.clientY);
      //   if (distanceBorderX == null) { // 第一次移动时不需要处理移动，计算鼠标与选框left距离
      //     distanceBorderX = eventClientX - pos.left
      //     distanceBorderY = eventClientY - pos.top
      //     return;
      //   }
      //   // 计算当前鼠标X与初始的选框left位置实际移动的距离
      //   var diffLeft = eventClientX - distanceBorderX - pos.left;
      //   this.render2.setStyle(this.adjust.nativeElement, "left", (this.adjust.nativeElement.offsetLeft + diffLeft) + "px");
      //   // 计算当前鼠标Y与初始的选框top位置实际移动的距离
      //   var diffTop = eventClientY - distanceBorderY - pos.top;
      //   this.render2.setStyle(this.adjust.nativeElement, "top", (this.adjust.nativeElement.offsetTop + diffTop) + "px");
      // })
    });
  }

  top(eventClientY: number, elementOffsetTop: number, elementTop: number, elementHeight: number) {
    eventClientY = this.processMoveBeyondY(eventClientY);
    var diffHeight = eventClientY - elementTop;
    this.render2.setStyle(this.adjust.nativeElement, "height", (elementHeight - diffHeight) + "px");
    this.render2.setStyle(this.adjust.nativeElement, "top", (elementOffsetTop + diffHeight) + "px");
  }

  processMoveBeyondY(eventClientY: number): number {
    // 处理鼠标Y轴超出画布
    var panelElementPos = this.panelElement.getBoundingClientRect();
    if (eventClientY > panelElementPos.top + panelElementPos.height) {
      return panelElementPos.top + panelElementPos.height;
    } else if (eventClientY < panelElementPos.top) {
      return panelElementPos.top;
    }
    return eventClientY;
  }

  bottom(eventClientY: number, elementOffsetTop: number, elementTop: number, elementHeight: number) {
    eventClientY = this.processMoveBeyondY(eventClientY);
    const diffHeight = eventClientY - elementHeight - elementTop; // 计算向右移动之后与元素右边框距离
    this.render2.setStyle(this.adjust.nativeElement, "height", (elementHeight + diffHeight) + "px");
    if (eventClientY < elementTop) {
      this.render2.setStyle(this.adjust.nativeElement, "top", (elementOffsetTop + eventClientY - elementTop) + "px");
    }
  }

  right(eventClientX: number, elementWidth: number, elementLeft: number, elementOffsetLeft: number) {
    eventClientX = this.processMoveBeyondX(eventClientX);
    const diffWidth = eventClientX - elementWidth - elementLeft; // 计算向右移动之后与元素右边框距离
    this.render2.setStyle(this.adjust.nativeElement, "width", (elementWidth + diffWidth) + "px");
    if (eventClientX < elementLeft) {
      this.render2.setStyle(this.adjust.nativeElement, "left", (elementOffsetLeft + eventClientX - elementLeft) + "px");
    }
  }

  processMoveBeyondX(eventClientX: number): number {
    // 处理鼠标X轴超出画布
    var panelElementPos = this.panelElement.getBoundingClientRect();
    if (eventClientX > panelElementPos.left + panelElementPos.width) {
      return panelElementPos.left + panelElementPos.width;
    } else if (eventClientX < panelElementPos.left) {
      return panelElementPos.left;
    }
    return eventClientX;
  }

  left(eventClientX: number, elementWidth: number, elementLeft: number, elementOffsetLeft: number) {
    eventClientX = this.processMoveBeyondX(eventClientX);
    var diffWidth = eventClientX - elementLeft;
    this.render2.setStyle(this.adjust.nativeElement, "left", (elementOffsetLeft + diffWidth) + "px");
    this.render2.setStyle(this.adjust.nativeElement, "width", (elementWidth - diffWidth) + "px");
  }


  processAdjust() {
    // 放在抖动（在移动上中点时会出现抖动导致位置和高度出现往返的情况）
    this.render2.listen(this.adjust.nativeElement, "resize", (event) => {
      setTimeout(() => {
      }, 100);
    });

    // 上左
    let node0 = this.adjust.nativeElement.childNodes[0];
    this.render2.listen(node0, "mousedown", (event) => this.onDragAdjust(event, (event2) => {
      var pos = this.adjust.nativeElement.getBoundingClientRect();
      this.left(event2.clientX, pos.width, pos.left, this.adjust.nativeElement.offsetLeft);
      this.top(event2.clientY, this.adjust.nativeElement.offsetTop, pos.top, pos.height);
    }));

    // 上中
    let node1 = this.adjust.nativeElement.childNodes[1];
    this.render2.listen(node1, "mousedown", (event) => this.onDragAdjust(event, (event2) => {
      var pos: DOMRect = this.adjust.nativeElement.getBoundingClientRect();
      this.top(event2.clientY, this.adjust.nativeElement.offsetTop, pos.top, pos.height);
    }));

    // 上右
    let node2 = this.adjust.nativeElement.childNodes[2];
    this.render2.listen(node2, "mousedown", (event) => this.onDragAdjust(event, (event2) => {
      var pos = this.adjust.nativeElement.getBoundingClientRect();
      this.top(event2.clientY, this.adjust.nativeElement.offsetTop, pos.top, pos.height);
      this.right(event2.clientX, pos.width, pos.left, this.adjust.nativeElement.offsetLeft);
    }));


    // 左中
    let node3 = this.adjust.nativeElement.childNodes[3];
    this.render2.listen(node3, "mousedown", (event) => this.onDragAdjust(event, (event2) => {
      var pos: DOMRect = this.adjust.nativeElement.getBoundingClientRect();
      this.left(event2.clientX, pos.width, pos.left, this.adjust.nativeElement.offsetLeft);
    }));

    // 右中
    let node4 = this.adjust.nativeElement.childNodes[4];
    this.render2.listen(node4, "mousedown", (event) => this.onDragAdjust(event, (event2) => {
      var pos: DOMRect = this.adjust.nativeElement.getBoundingClientRect();
      this.right(event2.clientX, pos.width, pos.left, this.adjust.nativeElement.offsetLeft);
    }));

    // 下左
    let node5 = this.adjust.nativeElement.childNodes[5];
    this.render2.listen(node5, "mousedown", (event) => this.onDragAdjust(event, (event2) => {
      var pos: DOMRect = this.adjust.nativeElement.getBoundingClientRect();
      this.left(event2.clientX, pos.width, pos.left, this.adjust.nativeElement.offsetLeft);
      this.bottom(event2.clientY, this.adjust.nativeElement.offsetTop, pos.top, pos.height);
    }));

    // 下中
    let node6 = this.adjust.nativeElement.childNodes[6];
    this.render2.listen(node6, "mousedown", (event) => this.onDragAdjust(event, (event2) => {
      var pos: DOMRect = this.adjust.nativeElement.getBoundingClientRect();
      this.bottom(event2.clientY, this.adjust.nativeElement.offsetTop, pos.top, pos.height);
    }));

    // 下右
    let node7 = this.adjust.nativeElement.childNodes[7];
    this.render2.listen(node7, "mousedown", (event) => this.onDragAdjust(event, (event2) => {
      var pos: DOMRect = this.adjust.nativeElement.getBoundingClientRect();
      this.right(event2.clientX, pos.width, pos.left, this.adjust.nativeElement.offsetLeft);
      this.bottom(event2.clientY, this.adjust.nativeElement.offsetTop, pos.top, pos.height);
    }));
  }

  onDragAdjust(event, moveChange: (event) => void) {
    event.stopPropagation()
    event.preventDefault()
    let vcRemoveMousemoveFn: () => void;
    let vcRemoveMouseupFn: () => void;
    let vcRemoveMouseoutFn: () => void;

    const removeMoveseListenFn = () => {
      vcRemoveMousemoveFn();
      vcRemoveMouseupFn();
      vcRemoveMouseoutFn();
    }
    vcRemoveMousemoveFn = this.render2.listen(this.panelElement, "mousemove", (event2) => moveChange(event2));
    vcRemoveMouseupFn = this.render2.listen(this.panelElement, "mouseup", removeMoveseListenFn);
    vcRemoveMouseoutFn = this.render2.listen(this.panelElement, "mouseout", (event3) => {
      var panelElementPos = this.panelElement.getBoundingClientRect();

      // 处理鼠标快速移出画布并松开鼠标再返回画布，能继续拖拽问题
      if (event3.buttons === 0) {
        removeMoveseListenFn();
        return;
      }

      // 处理鼠标移除画布
      if (event3.clientX >= panelElementPos.left + panelElementPos.width
        || event3.clientX <= panelElementPos.left
        || event3.clientY >= panelElementPos.top + panelElementPos.height
        || event3.clientY <= panelElementPos.top) {
        removeMoveseListenFn();
      }
    });
  }
}
