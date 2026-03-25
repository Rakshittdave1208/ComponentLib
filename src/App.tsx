// import Modal from "./component/Modal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./component/Tabs";
import "./index.css";
// import Dropdown from "./component/Dropdown";
// import ToastProvider from "./component/toast/ToastProvider";
// import { useToast } from "./component/toast/useToast";

// function Demo() {
//   const { success, error } = useToast();

//   return (
//     <div className="flex flex-col gap-4">
//       <button
//         onClick={() => success("Success Toast 🚀")}
//         className="px-4 py-2 bg-green-600 text-white rounded-lg"
//       >
//         Success Toast
//       </button>

//       <button
//         onClick={() => error("Error Toast ❌")}
//         className="px-4 py-2 bg-red-500 text-white rounded-lg"
//       >
//         Error Toast
//       </button>
//     </div>
//   );
// }

function App() {
  return (
    // <ToastProvider>
    //   <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //     {/* <Dropdown /> */}
    //     {/* <Modal /> */}
    //     <Demo />
    //   </div>
    // </ToastProvider>

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>

        <TabsContent value="tab1">
          Content for Tab 1 🚀
        </TabsContent>

        <TabsContent value="tab2">
          Content for Tab 2 🔥
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;