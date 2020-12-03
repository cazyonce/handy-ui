import { Component, OnInit, Compiler, Injector, NgModuleRef, NgModule, ViewChild, ViewContainerRef, ChangeDetectorRef, ComponentFactoryResolver, NgModuleFactoryLoader, ElementRef, Renderer2 } from '@angular/core';
import { RouteModule } from '../../route.module';
import { MyNgZorroAntdModule } from 'src/app/shared/my-ng-zorro-antd.module';
import { NzButtonGroupComponent } from 'ng-zorro-antd/button/public-api';
import { ButtonComponent } from '../product/button/button.component';
import { ButtonService } from '../../../core/service/component/button-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;

  @ViewChild('selector', { read: ElementRef }) selector: ElementRef;


  @ViewChild('testbutton', { read: ElementRef }) testbutton: ElementRef;
  components = [new ButtonService()];
  // constructor() { }
  constructor(private _compiler: Compiler,
    private _injector: Injector,
    private _m: NgModuleRef<any>, private componentFactoryResolver: ComponentFactoryResolver, private loader: NgModuleFactoryLoader, private render2: Renderer2) {
  }
  currentComponentService: ButtonService;
 

  lastElement;

  ngOnInit() {

  }
  

  onClickElement(event) {
    var el: any = document.elementFromPoint(event.clientX, event.clientY);
    if (this.lastElement != null && this.lastElement == el) {
      return;
    }

  }

  parsePXToInt(px: string): number {
    if (px != "" && px !== "0px") {
      return Number.parseInt(px.substring(0, px.length - 2));
    }
    return 0;
  };

  // 根据鼠标位置获取元素
  public posqq(event) {
    var el: any = document.elementFromPoint(event.clientX, event.clientY);
    if (this.lastElement != null && this.lastElement == el) {
      return;
    }
    console.log(document.documentElement.scrollTop)
    this.lastElement = el;
    // console.log(el.offsetHeight, el.offsetWidth)
    var pos = el.getBoundingClientRect();

    // console.dir(pos)
    // console.log(el.style.paddingLeft, el.style.paddingLeft === undefined, el.style.paddingLeft === null, el.style.paddingLeft === "")
    this.render2.setStyle(this.selector.nativeElement.firstChild, "width", pos.width + "px");
    this.render2.setStyle(this.selector.nativeElement.firstChild, "height", pos.height + "px");

    var padding = { top: this.getstyle(el, "padding-top"), bottom: this.getstyle(el, "padding-bottom"), left: this.getstyle(el, "padding-left"), right: this.getstyle(el, "padding-right") };
    var margin = { top: this.getstyle(el, "margin-top"), bottom: this.getstyle(el, "margin-bottom"), left: this.getstyle(el, "margin-left"), right: this.getstyle(el, "margin-right") };

    var offsetX = this.parsePXToInt(margin.left);
    //  parsePXToInt(padding.left)  + + parsePXToInt(padding.right)+ parsePXToInt(margin.right);

    var offsetY = this.parsePXToInt(margin.top);
    //   parsePXToInt(padding.top)+ + parsePXToInt(padding.bottom)+ parsePXToInt(margin.bottom);

    // var left = el.style.marginLeft
    // if (left != "" && left !== "0px") {
    //   offsetX += Number.parseInt(left.substring(0, left.length - 2));
    // }

    // left = el.style.paddingLeft
    // if (left != "" && left !== "0px") {
    //   offsetX += Number.parseInt(left.substring(0, left.length - 2));
    // }

    this.render2.setStyle(this.selector.nativeElement, "left", (pos.left - offsetX + document.documentElement.scrollLeft) + "px");

    // var offsetY = 0;
    // var top = el.style.marginTop
    // if (top != "" && top !== "0px") {
    //   offsetY += Number.parseInt(top.substring(0, top.length - 2));
    // }

    // top = el.style.paddingBottom
    // if (top != "" && top !== "0px") {
    //   offsetY += Number.parseInt(top.substring(0, top.length - 2));
    // }

    this.render2.setStyle(this.selector.nativeElement, "top", (pos.top - offsetY + document.documentElement.scrollTop) + "px");
    console.log("padding", padding)
    console.log("margin", margin)
    console.log(el.localName, pos, offsetX, offsetY)
    // var elPaddingLeft = el.style.paddingLeft;
    // if (elPaddingLeft === "" || elPaddingLeft === "0px") {
    //   this.render2.removeStyle(this.selector.nativeElement, "border-left");
    // } else {
    //   this.render2.setStyle(this.selector.nativeElement, "border-left", el.style.paddingLeft+" solid");
    // }
    this.setBorder(this.selector.nativeElement.firstChild, padding.left, "left", "#c2e6c2");
    this.setBorder(this.selector.nativeElement.firstChild, padding.top, "top", "#c2e6c2");
    this.setBorder(this.selector.nativeElement.firstChild, padding.right, "right", "#c2e6c2");
    this.setBorder(this.selector.nativeElement.firstChild, padding.bottom, "bottom", "#c2e6c2");


    this.setBorder(this.selector.nativeElement, margin.left, "left", "#f1ac2e63");
    this.setBorder(this.selector.nativeElement, margin.top, "top", "#f1ac2e63");
    this.setBorder(this.selector.nativeElement, margin.right, "right", "#f1ac2e63");
    this.setBorder(this.selector.nativeElement, margin.bottom, "bottom", "#f1ac2e63");

    // console.dir(this.selector.nativeElement.firstChild)
    // this.render2.setStyle(this.selector.nativeElement, "height", el.offsetHeight + "px");
    // this.render2.setStyle(this.selector.nativeElement, "border", "solid 1px");
    // console.dir(this.selector)
  }

  onClickConponentName(component: ButtonService) {
    this.currentComponentService = component;
    component.generateComponent(this._compiler, this.vc)

    //   const template = '<button nz-button nzType="primary">Primary Buttonqqqqqqqqqqq</button>';

    // const tmpCmp = Component({ template: template })(class {
    // });
    // const tmpModule = NgModule({ declarations: [tmpCmp], imports: [MyNgZorroAntdModule] })(class {
    // });

    // this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
    //   .then((factories) => {
    //     const f = factories.componentFactories[0];
    //     const cmpRef = this.vc.createComponent(f);
    //     cmpRef.instance.name = 'dynamic';
    //   })
  }

  setBorder(el, paddingValue: string, posName: string, borderColor: string) {
    if (paddingValue === "" || paddingValue === "0px") {
      this.render2.removeStyle(el, ("border-" + posName));
    } else {
      this.render2.setStyle(el, ("border-" + posName), paddingValue + " solid " + borderColor);
    }
  }
  getstyle(obj, style) {
    if (obj.currentStyle) {
      return obj.currentStyle[style] //ie下获取样式
    } else {
      // console.log(document.defaultView.getComputedStyle(obj,null).getPropertyValue(style))
      return document.defaultView.getComputedStyle(obj, null)[style]//谷歌，火狐下获取默认样式
      // return  document.defaultView.getComputedStyle(obj,null)[style]//谷歌，火狐下获取默认样式
    }
  }

  // ngAfterViewInit() {
  //  var f= this.componentFactoryResolver.resolveComponentFactory(ButtonComponent);
  //  //.create(this._injector,[[]],this._m);
  //  console.log(f)
  //   const cmpRef = this.vc.createComponent(f);
  // }
  // ngAfterViewInit() {
  //   console.log(111,this.testbutton)
  //   // document.getElementById("testbutton").createAttribute("nz-button")
  //   // this.testbutton.nativeElement.attributes["nz-button"]="";

  //   const template = '<span>generated on the fly: {{name}}</span><button nz-button nzType="primary">Primary Buttonqqqqqqqqqqq</button>';

  //   const tmpCmp = Component({ template: template })(class {
  //   });
  //   const tmpModule = NgModule({ declarations: [tmpCmp], imports: [MyNgZorroAntdModule] })(class {
  //   });

  //   this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
  //     .then((factories) => {
  //       const f = factories.componentFactories[0];
  //       // console.log(factories.componentFactories)
  //       // console.log(this.vc)
  //       // console.log(f)
  //       const cmpRef = this.vc.createComponent(f);
  //       cmpRef.instance.name = 'dynamic';
  //       // var ref:ChangeDetectorRef = cmpRef.changeDetectorRef;
  //       // cmpRef.hostView.detectChanges()
  //       // cmpRef.changeDetectorRef.reattach();
  //       // cmpRef.changeDetectorRef.detectChanges();
  //       // console.dir(cmpRef)
  //     })
  // }

  // loadComponent() {

  //   // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
  //   const template = '<span>generated on the fly: {{name}}</span><button nz-button nzType="primary">Primary Button</button>';

  //   const tmpCmp = Component({template: template})(class {
  //   });
  //   const viewContainerRef = this.adHost.viewContainerRef;
  //   viewContainerRef.clear();

  //   const componentRef = viewContainerRef.createComponent(componentFactory);
  //   (<AdComponent>componentRef.instance).data = adItem.data;
  // }

}
