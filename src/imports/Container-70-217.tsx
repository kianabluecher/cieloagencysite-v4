import imgC0075978Deec559Bb04E8D8F1555567409C5AaMv2Jpg from "figma:asset/6dd37e33b693743ff48e5521896158737b8fb10b.png";

function C0075978Deec559Bb04E8D8F1555567409C5AaMv2Jpg() {
  return (
    <div className="absolute h-[263px] left-0 top-0 w-[334px]" data-name="c00759_78deec559bb04e8d8f1555567409c5aa~mv2.jpg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgC0075978Deec559Bb04E8D8F1555567409C5AaMv2Jpg} />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bottom-0 h-[263px] left-0 overflow-clip w-[334px]" data-name="Container">
      <div className="absolute bg-[rgba(0,0,0,0.3)] h-[263px] left-0 opacity-0 top-0 w-[334px]" data-name="Overlay" />
    </div>
  );
}

export default function Container1() {
  return (
    <div className="overflow-clip relative rounded-[10px] size-full" data-name="Container">
      <C0075978Deec559Bb04E8D8F1555567409C5AaMv2Jpg />
      <Container />
    </div>
  );
}