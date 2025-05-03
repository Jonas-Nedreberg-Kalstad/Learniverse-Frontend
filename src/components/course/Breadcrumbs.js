import '../../App.css';

function Breadcrumps({category, courseName}) {
  return (
    <section className="Breadcrumbs-Container">
      <text className='Text-Light'>{category ? category : ""}</text>
      <text className='Text-Light'> - </text>
      <text className='Text-Light'>{courseName}</text>
    </section>
  );
}

export default Breadcrumps;