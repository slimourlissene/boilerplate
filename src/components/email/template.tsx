export default function EmailTemplate({ firstName }: { firstName: string }) {
  return (
    <div>
      <h1> Hello,{firstName} </h1>
    </div>
  );
}
