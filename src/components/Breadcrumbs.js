import '../App.css';

function Breadcrumps({category, courseName}) {
  return (
    <div className="Breadcrumbs-Container">
      <text>{category}</text>
      <text> - </text>
      <text>{courseName}</text>
    </div>
  );
}

export default Breadcrumps;