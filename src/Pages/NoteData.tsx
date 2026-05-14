import React, { useEffect, useState, type ChangeEvent} from "react";
import Portal from "../Portal/UserPortal";



interface Note {
  _id ? : string
  title: string;
  description: string;
}

const NoteData: React.FC = () => {
  const [isPortalOpen ,setIsPortalOpen] = useState(false)
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectNote , setSelectNote] = useState<Note|null>(null)
  const [loading, setLoading] = useState<boolean>(true);
 



  const handleNotes = async (): Promise<any> => {
    try {
      setLoading(true)


      const data = await fetch("https://vercel-crud-backhend.vercel.app/api/getdata", {

    

        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await data.json();

      if (result.success) {
        setNotes(result.data);
      } else {
        console.log("Cannot get the note");
      }

      console.log(result);
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = async (e:React.ChangeEvent<HTMLFormElement>)=>{
     e.preventDefault()
    try {

      const data = await fetch("https://vercel-crud-backhend.vercel.app/api/createdata",{

  
        method :"POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          id : selectNote?._id,
          title : selectNote?.title,
          description : selectNote?.description
        })
       
      })
      const result = await data.json()
      if(result.success){
        setIsPortalOpen(false)
      
      handleNotes()
      setSelectNote(null)
      }else{
        alert("Failed To Update Data")
      }
    } catch (error) {
      console.log("Cant fetch the data",error)
    }
  }
  const handleDelete = async(id:string)=>{
    try {

      const deleteNote = await fetch("https://vercel-crud-backhend.vercel.app/api/deletenote",{

      

        method : "DELETE",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({id:id})
      }
    
    )
      const result = await deleteNote.json()
      if(result.success){
         setNotes(notes.filter(item =>item._id !== id))
      }
    } catch (error) {
      console.log("Failed To Fetch")
    }

  }
 
  const handleEdit = (note :Note)=>{
     setSelectNote(note)
     setIsPortalOpen(true)
  }
const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  if (selectNote) {
    setSelectNote({
      ...selectNote,
      [e.target.name]: e.target.value,
    });
  }
};

  useEffect(() => {
    handleNotes();
  }, []);

  if (loading) return <div>Loading notes...</div>;

  return (
    <div className=" mx-auto p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-8 text-center ">My Notes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6   ">
        {notes.map((note) => (
          <div
            key={note._id}
            className="flex flex-col  bg-white border border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden relative"
          >
            <div className="bg-black p-4">
              <h3 className="text-xl font-bold text-white ">
                {note.title}
              </h3>
            </div>
             <div className="absolute top-1 right-10  text-xl text-blue-950">
               <button className="px-4 py-3 cursor-pointer"><i className="fa-solid fa-pen" onClick={()=>handleEdit(note)}></i></button>
            </div>
             <div className="absolute top-1 right-2  text-xl text-red-600">
               <button className="px-4 py-3 cursor-pointer"><i className="fa-solid fa-trash" onClick={()=>handleDelete(note._id!)}></i></button>
            </div>

            <div className="p-5 h-auto">
              <p className="text-gray-700 leading-relaxed  ">
                {note.description}
              </p>
            </div>
           

            
          </div>
        ))}
      </div>
      {isPortalOpen &&
      (
        <>
        <Portal isOpen={isPortalOpen} onClose={()=>setIsPortalOpen(false)}>
        <div className="px-4 py-3 text-3xl text-white tracking-wider text-center">
          <h1>Your Note</h1>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="px-3 py-4 flex flex-col space-y-2 text-xl ">
            <label  className="block  font-bold md:text-base text-white ">
              Title :
            </label>

            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                outline-none transition duration-200 bg-white   "
                name="title"
                value={selectNote?.title}
              onChange={handleChange}
             
            />
          </div>
          <div className="px-3 py-4 flex flex-col space-y-2 ">
            <label className="block text-sm font-bold text-white md:text-base">
              Description :
            </label>

            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                outline-none transition duration-200 bg-white mb-10 min-h-40"
                name="description"
                value={selectNote?.description}
              onChange={handleChange}
              
            ></textarea>
            <div className=" text-white mx-auto  rounded-2xl">
              <button className="px-4 py-3 bg-red-600 w-full tracking-wider text-xl rounded-2xl cursor-pointer">
                Update{" "}
              </button>
            </div>
          </div>
        </form>
        </Portal>
        </>
      )}
       
    </div>
  );
};

export default NoteData;
