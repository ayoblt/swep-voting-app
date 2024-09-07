// import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
// import {DotsVerticalIcon} from "@radix-ui/react-icons";
// import LogoutBtn from "@/components/logout-btn";
// import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
// // import {verifySession} from "@/lib/dal";
//
// export const AccountLabel = async () => {
//     // const {isAuth, token, is_admin} = await verifySession()
//
//     return (
//         <div
//             className="bg-primary rounded-md p-4 max-lg:md:p-2 flex items-center gap-x-2 text-white overflow-hidden relative mt-auto z-[999999]">
//             <div className="absolute top-3 right-3">
//                 <DropdownMenu>
//                     <DropdownMenuTrigger>
//                         <DotsVerticalIcon className="h-4 w-4"/>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent>
//                         <DropdownMenuItem className="hover:bg-none">
//                             <LogoutBtn/>
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             </div>
//             <Avatar>
//                 <AvatarImage src="https://github.com/shadcn.png"/>
//                 <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//             <div className="space-y-1">
//                 <h4 className="text-xs font-semibold">Welcome {isAuth && is_admin ? "Admin" : "Voter"}</h4>
//                 <p className="text-[10px] font-medium">
//                     lateeftaiwo@student.oauife.edu.ng
//                 </p>
//             </div>
//         </div>
//     )
// }
