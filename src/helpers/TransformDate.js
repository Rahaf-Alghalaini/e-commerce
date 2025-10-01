export default function TransformDate(date)
{

    const SelectedDate=new window.Date(date);
    const GetFullYear= SelectedDate.getFullYear();
     const GetMonth=( SelectedDate.getMonth()+1).toString().padStart(2,"0");
     const GetDay= SelectedDate.getDate().toString().padStart(2,"0");
     return `${GetFullYear}-${GetMonth}-${GetDay}`;

}