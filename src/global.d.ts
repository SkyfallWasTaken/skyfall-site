export declare global {
  namespace preact {
    namespace JSX {
      interface IntrinsicAttributes<T> {
        as?: string | Element;
      }
      // The css prop
      interface HTMLAttributes<RefType extends EventTarget = EventTarget>
        extends ClassAttributes<RefType>,
          DOMAttributes<RefType>,
          AriaAttributes {
        css?: CSSProp;
        tw?: string;
      }
      // The inline svg css prop
      interface SVGAttributes<Target extends EventTarget = SVGElement>
        extends HTMLAttributes<Target> {
        css?: CSSProps;
        tw?: string;
      }
    }
  }
}
