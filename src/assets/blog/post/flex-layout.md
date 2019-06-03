![](https://cdn-images-1.medium.com/max/2600/1*Ogq3I6dAZG_pxEh-Nyd4vg.png)
<span class="figcaption_hack">The Masquerade (Claptone) by Jesús Sotes
([https://www.jesussotes.com](https://www.jesussotes.com/))</span>

# Angular Flex Layout: The Masquerade

## Easy flexbox with superpowers

In this post I’ll summarize the possibilities of flexbox and how Angular Flex
Layout enrich and simplifies it with a cool declarative and responsive API.

### WHAT THE FLEX?

Flexbox super simplifies the nightmare that positioning elements with CSS was,
but it remains confusing, maybe because its really bad nomenclature and its
space relativity. Let’s clear it up!

#### POSSIBILITIES

Here are most of the possibilities of flexbox:

* **Click on ‘Preview’, at the bottom of the embedded iframe, to see only the
app.**
* *Add more items and click on the ‘wrap’ button to see ***align-content*** in
action (it only works with multi-line layouts).*
* *Change ***container*** (flex-flow, place-content)and ***items*** settings
(align-items, grow, shrink…) to see the effects. ie: set basis to 0 to see the
items collapse to its smallest possible width given the content.*

If you already mastered flexbox, you can jump to the next section.

#### **RELATIVITY**

In order to be useful for all the languages, in FlexBox there are no physical
references like top, bottom, right or left. All is relative to the **direction
**you choose for the items to flow, and to the language you speak.

If you are writing in english and you choose **direction** **row**, the
main-axis will be horizontal, from left to right, and the lines of items will
flow the same, from left to right. If you choose **direction** **column, **the
main-axis will be vertical, from top to bottom, and the lines of items will flow
from top to bottom. But if you would write in Arabic, then a row of items would
go from right to left…

> Because of that,** in Flexbox the physical references (top, bottom, right, left)
> are replaced by the relative references** **main-axis and cross-axis. The
main-axis is the direction (row | column) you choose, the cross-axis is the
opposite.**

**As a rule of thumb, in an english written document **(or any other
left-to-right language):

    direction
    direction

![](https://cdn-images-1.medium.com/max/1600/1*otjfye20y3HU1uvUGSmlbQ.jpeg)
<span class="figcaption_hack">[http://liangfei.me/2017/08/22/meeting-css/](http://liangfei.me/2017/08/22/meeting-css/)</span>

#### **CONTAINER — CONTENT — LINE — ITEM**

Flexbox has 4 levels of layout:

**Container:** the canvas of the layout. <br> **Content: **all the lines of the
container.<br> **Line:** group of items that are in the same row or column
(depending on the main-axis (flex-direction)).<br> **Item: **each individual
element of a line.

#### POSITIONING THE CONTENT

The **Container** defines the layout of the **Content **with** **two properties:

#### **Flex-Flow**

Flex-flow is the mix of the** [flex-direction],** if the lines of content are
going to be rows or columns, and its **[flex-wrap]**, that is to say, if the
items should wrap and jump to a new line when they reach the limit of the
container.

    .container { 
    };



* *Remember, the ***[flex-direction] determines [main-axis].* ***Jump up to the
editor to play with flex-flow.*

#### Place-Content

Place-content is the mix of the **[align-content], **how the content is placed
in the cross-axis, and** [justify-content], **how the content is placed in the
main-axis.

    .container { 
    };

    // Options

> **align-content **has no effect on a
> [single-line](https://www.w3.org/TR/css-flexbox-1/#single-line-flex-container)
[flex container](https://www.w3.org/TR/css-flexbox-1/#flex-container), only in
flex containers with multiple lines. For
[single-line](https://www.w3.org/TR/css-flexbox-1/#single-line-flex-container)
[flex container](https://www.w3.org/TR/css-flexbox-1/#flex-container)s use
align-items.

*** ***Jump up to the editor to play with align-content.*

#### POSITIONING THE ITEMS

The **Container** defines the layout of the items** **with **align-items.**

#### Align-items

Align-items defines how the items are going to be laid out regarding to its line
of content.

    .container { 
     
    ;
    };

#### **Align-self**

Finally, an **Item **can overwrite its align-items position with align-self.

    .item { 
    };

*** ***Jump up to the editor to play with align-items and align-self.*

#### POSITIONING CHEATSHEET

> **MAIN-AXIS (row/column)**<br> Position the **content** with
> **justify-content**.

> **CROSS-AXIS**<br> Position the **content** with **align-content**.<br> Position
> the **items** regarding to its line with **align-items**.<br> Position one
**item** regarding to its line with **align-self**.

#### SIZING THE ITEMS

So items are in a flexible container… What is going to be their size? How are
they going to grow or shrink?

#### **Main-axis-size**

The size on the main-axis is defined with the flex property of the item:

    .item { 
    };

    // Options
     integer; (Default: 0)
     integer; (Default: 1)
    integer | % | auto | initial | inherit; (Default: auto)

Flex-basis is the size from which the item will grow or shrink.

Grow defines how many portions of the free space in the container this item will
take. For example, if there are 300px of free space and there are two items
(flex-grow: 1, flex-grow: 2), the total portions of free space are 3. The first
item will take 1 (100px) and the second item will take 2 (200px). Shrink works
the same but with the shrunk space.

The size of the item is determined by this order of precedence: <br>
**flex-basis > declared main-axis size (width/height) > conten**t

The size of the item will be its flex-basis size if there is no max/min
main-axis size declared (max/min width/height, depending on flex-direction).

If there is not flex-basis defined, the size will be its declared main-axis size
(width/height) if present. If not, it defaults to its content’s size.

#### **Cross-axis-size**

In the cross-axis the default size of an item is its content’s size, unless you
choose ‘stretch’ in align-content or align-items, or you declare an specific
cross-axis size (width in direction column/height in direction row).

#### ORDERING THE ITEMS

By default, the items are going to be placed in order in the main-axis. We can
change this default order with the ‘order’ property of the items:

    .item { 
    integer (positive or negative); (Default: 0)
    };

### JUMPING INTO FLEXLAYOUT

Flex Layout is an Angular library that allows you to apply FlexBox directly in
the HTML, with integrated MediaQueries and a few more superpowers. Let’s see it
per directives with its CSS equivalent:

#### **CONTAINER:**

**fxLayout=”[flex-direction] [flex-wrap]”** Sets **display:flex** and the
**flex-flow** of the container.

    // Flex Layout
    <div 
    >...

    // Flexbox equivalent
    <div 
    ”>...

** FlexLayout defaults to “row no-wrap”*

**fxLayoutAlign=”[justify-content]***(main-axis)
***[align-content]***(cross-axis)***”** Sets the **place-content **values of the
container.

    // Flex Layout
    <div 
    >...

    // Flexbox equivalent
    <div 

** If you need the default FlexLayout (“row no-wrap”), you can skip declare it
when using fxLayoutAlign.*

#### **ITEMS:**

**fxFlex=”[grow]*** ***[shrink][basis]”**Sets the flex **grow, shrink **and**
basis **values of the item.

    // Flex Layout
    <div 

    // Flexbox equivalent
    <div 

**fxFlexAlign=”[align-self]”**Sets the flex **align-self **of the item.

    // Flex Layout
    <div 
    >...

    // Flexbox equivalent
    <div 
     

**fxFlexOrder=”[order]”**Sets the flex **order** of the item.

    // Flex Layout
    <div 
    >...

    // Flexbox equivalent
    <div 

For didactic purposes, all this equivalence samples are inline styles but, in a
production app, we should create a class for each kind of item and write its
styles in the corresponding CSS sheet.

This way, with Flex Layout we can save a lot of work writing our CSS flexbox
rules in the template and it is declarative; looking at the template it’s clear
what is going on.

#### SUPERPOWERS

**RESPONSIVE IT UP**Flex Layout extends all this fx directives with mediaQuery
support so they are only applied when the viewport size targeted is activated.

The default breakpoints are:

![](https://cdn-images-1.medium.com/max/1600/1*udgse5zea4wvE4VumfnpeQ.png)

So if we would want to apply a different **fxLayoutAlign** for viewports between
960px and 1279px, we would just add the ‘md’ breakpoint to the directive like
this:

    // Flex Layout
    <div 
    >...

    // Flexbox equivalent
    <div 
    </div> 

    // styles.css
    .flexbox-sample {
       display: flex;
       place-content: flex-start flex-start;
    }


Wow!, this saves a lot of coding and maintenance and it’s really understandable
just by looking at the template. We won’t have to look to the style sheet
anymore to understand the responsive behavior of our templates.

**RESPONSIVE LOOK**Every responsive design needs to show, hide or modify the
look of some elements per breakpoint. Don’t worry, it’s covered bro:

**fxShow and fxHide**Show/hide the hosting element when the breakpoint targeted
is activated.

    <div 
    >Hello</div>

This div would be hidden and ONLY shown on viewport sizes greater than 960px
(gt-sm breakpoint).

**ngClass and ngStyle**Add/remove classes/styles when the breakpoint targeted is
activated.

    <div ngClass="test1" 
         
    ="{'test1':false, 'test2':true}">...

In this case, on viewport sizes between 600px and 959px (sm breakpoint), the
class ‘test1’ would be removed and the class ‘test2’ applied . In all the rest
sizes (less than 600px or greater than 959px), only the class ‘test1’ will
remain applied.

    <p style="font-size:16px;"
       
    ="{'font-size': '12px'}">...

This paragraph would have a ‘font-size’ of 12px on viewport sizes less than
960px (lt-md breakpoint). In all the rest sizes (greater than 959px), the
‘font-size’ would be 16px.

**imgSrc**Show a different image when the breakpoint targeted is activated.

    <img src="default.png" src.xs="xsmall.png"/>

This image would be ‘xsmall.png’ in viewports less than 600px (xs breakpoint)
and ‘default.png’ in all the rest (greater than 599px).

**EXTRAS**FlexLayout provides 2 more directives to manage margins:
[fxLayoutGap](https://github.com/angular/flex-layout/wiki/fxLayoutGap-API)**=”integer
+ unit”** is applied to the container and adds a margin (right in row, bottom in
column) to all the items except the last. **fxFlexOffset=”integer + unit” **is
applied to the items and adds a margin-left.

**fxFlexFill **maximizes the width and height of the item where it is applied.

Finally, the **ObservableMedia** service will provide mediaQuery activations
notifications for all [registered
BreakPoints](https://github.com/angular/flex-layout/wiki/Custom-Breakpoints)
(yeah, you can configure your own breakpoints).

#### 3 SAMPLES

Let’s see three samples of common layouts made with Flex Layout:

* **Click on ‘Preview’, at the bottom of the embedded iframe, to see only the
app.**
* Resize the editor’s window to see the mobile layouts.

#### QUIRKS & LIMITATIONS

Despite to be a great library, right now Angular Flex Layout doesn’t provide
some of the flexbox features and has some quirks:

* **fxLayoutAlign** cross-axis (align-content) only admits flex-start, center,
flex-end and stretch options, so **we can’t apply space-between or space-around
in the cross-axis. **You can see a sample of this issue
[here](https://stackblitz.com/edit/flex-layout-issue-2).** **I have made a [pull
request](https://github.com/angular/flex-layout/pull/845) to add this options.
* **fxLayoutAlign** **doesn’t allow to specify a different align-content and
align-items** options. This is a mistake in the design because both are
responding to the same second parameter of fxLayoutAlign. I have made a
[proposal](https://github.com/angular/flex-layout/issues/842) to improve this.
* **fxFlex **flex-basis **fixes the main-axis size of the item making it
unresponsive** (it adds a min-width and max-width when direction=row, and
min-height and max-height when direction=column).<br> You can see a sample of
this issue
[here](https://stackblitz.com/edit/flex-layout-issue?file=app/app.component.html).

#### SOME RESOURCES

* [https://github.com/angular/flex-layout/wiki](https://github.com/angular/flex-layout/wiki)
(Official docs)
* [https://css-tricks.com/snippets/css/a-guide-to-flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
*(Great summary)*
* [https://flexbox.io](https://flexbox.io/) *(Wes Bos’s content is always great)*
* [https://mastery.games/p/flexbox-zombies](https://mastery.games/p/flexbox-zombies)
*(learn playing)*
* [https://www.smashingmagazine.com/category/flexbox](https://www.smashingmagazine.com/category/flexbox/)
*(Rachel Andrew’s posts)*
* [https://www.w3.org/TR/css-flexbox-1/](https://www.w3.org/TR/css-flexbox-1/)

Ok, that’s it. I hope you enjoyed it.

Thanks for reading! 🙏🤓

#### **You’ve learned something new, you deserve a gift:**

* [CSS](https://blog.angularindepth.com/tagged/css?source=post)
* [Angular](https://blog.angularindepth.com/tagged/angular?source=post)
* [Flexbox](https://blog.angularindepth.com/tagged/flexbox?source=post)
* [Angular Flex
Layout](https://blog.angularindepth.com/tagged/angular-flex-layout?source=post)
* [Layout](https://blog.angularindepth.com/tagged/layout?source=post)

### [Aleix Suau](https://blog.angularindepth.com/@aleixsuau)

### [Angular In Depth](https://blog.angularindepth.com/?source=footer_card)

The place where advanced Angular concepts are explained
