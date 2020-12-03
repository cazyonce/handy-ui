import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ElementToolService } from 'src/app/domain/ui-factory/core/service/component/element-tool.service';

@Component({
  selector: 'adjust',
  templateUrl: './adjust.component.html',
  styleUrls: ['./adjust.component.css']
})
export class AdjustComponent implements OnInit {

  // 0上左 1上中 2上右 3 左中 4右中 5下左 6下中 7下右
  @ViewChild('adjust', { read: ElementRef }) adjust: ElementRef;

  @ViewChild('vc', { read: ElementRef }) vc: ElementRef;

  currentAdjust: "topLeft" | "top" | "topRight" | "left" | "right" | "bottomLeft" | "bottom" | "bottomRight";
  vcRemoveMousemoveFn: () => void;
  vcRemoveMouseupFn: () => void;
  constructor(private render2: Renderer2, private toolService: ElementToolService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.processAdjust();
  }

  processAdjust() {
    // console.dir(this.adjust.nativeElement.childNodes)
    let node0 = this.adjust.nativeElement.childNodes[0];
    var pointRadius = this.toolService.parsePXToInt(this.toolService.getElementStyle(node0, "height")) / 2;
    var adjustWidth = this.toolService.parsePXToInt(this.toolService.getElementStyle(this.adjust.nativeElement, "width"));
    var adjustWidthRadius = adjustWidth / 2;
    var adjustHeight = this.toolService.parsePXToInt(this.toolService.getElementStyle(this.adjust.nativeElement, "height"));
    var adjustHeightRadius = adjustHeight / 2;
    // console.log(adjustWidthRadius, adjustHeightRadius)
    // console.dir(node0);
    // console.log(this.parsePXToInt(this.getstyle(node0, "height")), this.parsePXToInt(this.getstyle(node0, "width")))
    // 上左
    // this.render2.setStyle(node0, "top", "-" + pointRadius + "px");
    this.render2.setStyle(node0, "left", "-" + (pointRadius - 1) + "px");
    this.render2.listen(node0, "mousedown", (event) => {
      this.currentAdjust = "topLeft";
    })
    // this.render2.listen(node0, "mouseup", (event) => {
    //   this.currentAdjust = null;
    //   console.log("2222222")
    // })
    // 上中
    let node1 = this.adjust.nativeElement.childNodes[1];
    // this.render2.setStyle(node1, "top", "-" + pointRadius + "px");
    this.render2.setStyle(node1, "left", (adjustWidthRadius - pointRadius - 1) + "px");

    // 上右
    let node2 = this.adjust.nativeElement.childNodes[2];
    // this.render2.setStyle(node2, "top", "-" + pointRadius + "px");
    this.render2.setStyle(node2, "left", (adjustWidth - pointRadius - 1) + "px");


    // 左中
    let node3 = this.adjust.nativeElement.childNodes[3];
    this.render2.setStyle(node3, "top", (adjustHeightRadius - pointRadius) + "px");
    this.render2.listen(node3, "mousedown", (event) => this.onMoveAdjust(event, (event2) => {
      var pos = this.adjust.nativeElement.getBoundingClientRect();
      var diffWidth = event2.clientX - pos.left;
      console.log(this.adjust.nativeElement.offsetLeft, diffWidth, (this.adjust.nativeElement.offsetLeft + diffWidth))
      this.render2.setStyle(this.adjust.nativeElement, "left", (this.adjust.nativeElement.offsetLeft + diffWidth) + "px");
      this.render2.setStyle(this.adjust.nativeElement, "width", (pos.width - diffWidth) + "px");

      // 这部分代码不要删除，可能还有用
      // var diffLeft = event2.clientX - pos.left + this.adjust.nativeElement.offsetLeft;
      // this.render2.setStyle(this.adjust.nativeElement, "left", diffLeft + "px");
      // console.info(event2.clientX, pos.left, pos.width, diffLeft, (pos.width - diffLeft))

    }));


    // this.render2.setStyle(node3, "left", "-" + (pointRadius)  + "px");





    // 右中
    let node4 = this.adjust.nativeElement.childNodes[4];
    this.render2.setStyle(node4, "top", (adjustHeightRadius - pointRadius) + "px");
    this.render2.setStyle(node4, "left", (adjustWidth - pointRadius) + "px");
    this.render2.listen(node4, "mousedown", (event) => this.onMoveAdjust(event, (event2) => {
      var pos = this.adjust.nativeElement.getBoundingClientRect();
      const diffWidth = event2.clientX - pos.width - pos.left; // 计算向右移动之后与元素右边框距离
      this.render2.setStyle(this.adjust.nativeElement, "width", (pos.width + diffWidth) + "px");
      if (event2.clientX < pos.left) {
        this.render2.setStyle(this.adjust.nativeElement, "left", (this.adjust.nativeElement.offsetLeft + event2.clientX - pos.left) + "px");
      }

      var pointRadius = this.toolService.parsePXToInt(this.toolService.getElementStyle(node0, "height")) / 2;
      var adjustWidth = this.toolService.parsePXToInt(this.toolService.getElementStyle(this.adjust.nativeElement, "width"));
      let node2 = this.adjust.nativeElement.childNodes[2];   // this.render2.setStyle(node2, "top", "-" + pointRadius + "px");
      this.render2.setStyle(node2, "left", (adjustWidth - pointRadius - 1) + "px");

      // var diffWidth = pos.width - event2.clientX - pos.left + this.adjust.nativeElement.offsetLeft;
    }));

    // this.render2.listen(node4, "mousemove", (event) => {
    //   this.onMoveAdjust(event);
    // })

    // 下左
    let node5 = this.adjust.nativeElement.childNodes[5];
    this.render2.setStyle(node5, "top", (adjustHeight - pointRadius - 1) + "px");
    // this.render2.setStyle(node5, "left", "-" + (pointRadius-1) + "px");

    // 下中
    let node6 = this.adjust.nativeElement.childNodes[6];
    this.render2.setStyle(node6, "top", (adjustHeight - pointRadius - 1) + "px");
    this.render2.setStyle(node6, "left", (adjustWidthRadius - pointRadius - 1) + "px");

    // 下右
    let node7 = this.adjust.nativeElement.childNodes[7];
    this.render2.setStyle(node7, "top", (adjustHeight - pointRadius - 1) + "px");
    this.render2.setStyle(node7, "left", (adjustWidth - pointRadius - 1) + "px");
  }

  changeWidth(initialWidth: number, initialX: number, nowClientX: number) {

    const diffWidth = nowClientX - initialWidth - initialX; // 计算向右移动之后与元素右边框距离
    console.log(initialWidth, initialX, nowClientX, diffWidth, (initialWidth + diffWidth))
    this.render2.setStyle(this.adjust.nativeElement, "width", (initialWidth + diffWidth) + "px");

    this.render2.setStyle(this.adjust.nativeElement, "left", (initialWidth + diffWidth) + "px");
  }
  // 判断鼠标移动大于容器宽高就移除事件，不要重复添加和移除事件
  onMoveAdjust(event, moveChange: (event) => void) {
    event.stopPropagation()
    event.preventDefault()
    let vcRemoveMousemoveFn: () => void;
    let vcRemoveMouseupFn: () => void;
    let vcRemoveMouseoutFn: () => void;

    const removeMoveseListenFn = () => {
      vcRemoveMousemoveFn();
      vcRemoveMouseupFn();
      vcRemoveMouseoutFn()
    }

    vcRemoveMousemoveFn = this.render2.listen(this.vc.nativeElement, "mousemove", (event2) => moveChange(event2));
    // vcRemoveMousemoveFn = this.render2.listen(this.vc.nativeElement, "mousemove", (event2) => this.changeWidth(pos.width, pos.left, event2.clientX));
    vcRemoveMouseupFn = this.render2.listen(this.vc.nativeElement, "mouseup", removeMoveseListenFn);
    vcRemoveMouseoutFn = this.render2.listen(this.vc.nativeElement, "mouseout", (event3) => {
      var vsPos = this.vc.nativeElement.getBoundingClientRect();
      if (event3.clientX > vsPos.left + vsPos.width) {
        removeMoveseListenFn();
      }
    });
  }

  onMoveAdjust2(event) {
    if (this.currentAdjust == null) {
      return;
    }
    console.log(this.currentAdjust)
    var pos = this.adjust.nativeElement.getBoundingClientRect();
    if (this.currentAdjust === "topLeft") {
      // cons



      if (event.clientX < pos.left) {
        var left = event.clientX - pos.left;
        this.render2.setStyle(this.adjust.nativeElement, "left", (left + document.documentElement.scrollLeft) + "px");
        this.render2.setStyle(this.adjust.nativeElement, "width", (left + pos.width) + "px");
      }

      if (event.clientY < pos.top) {
        var top = event.clientY - pos.top;
        this.render2.setStyle(this.adjust.nativeElement, "top", (left + document.documentElement.scrollTop) + "px");
        this.render2.setStyle(this.adjust.nativeElement, "height", (top + pos.height) + "px");
      }
      return;
    }

    if (this.currentAdjust === "right") {
      console.log(event.clientX, event.clientY)
    }
  }
}
