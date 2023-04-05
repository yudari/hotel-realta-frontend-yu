import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function TabUser({ bonusPoints, historyMembers }: any) {
  let [categories] = useState({
    "Bonus Points": {
      table: ["Created On", "Bonus Type", "Point"],
      name: "bonusPoint",
      data: bonusPoints,
    },
    "History Member": {
      table: ["Promote Date", "Member Type", "Point", "Status"],
      name: "historyMember",
      data: historyMembers,
    },
  });

  return (
    <div className="w-full px-2 py-6 sm:px-0 shadow-sm">
      <Tab.Group>
        <Tab.List className="flex rounded shadow-md">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "px-4 py-2 text-sm leading-5 text-gray-600",
                  "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
                  selected
                    ? "border-b-2 border-primary text-primary font-bold"
                    : "text-blue-100 hover:bg-primary hover:rounded hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white pt-4",
                "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2"
              )}
            >
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {posts.table.map((tab) => (
                      <th scope="col" className="px-6 py-3" key={tab}>
                        {tab}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {posts.name === "bonusPoint"
                    ? posts.data.map((post: any) => (
                        <tr
                          key={post.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="px-6 py-4">{post.ubpo_created_on}</td>

                          <td className="px-6 py-4">{post.ubpo_bonus_type}</td>
                          <td className="px-6 py-4">
                            {post.ubpo_total_points}
                          </td>
                        </tr>
                      ))
                    : posts.data.map((post: any) => (
                        <tr
                          key={post.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="px-6 py-4">
                            {post.usme_promote_date}
                          </td>

                          <td className="px-6 py-4">{post.usme_memb_name}</td>
                          <td className="px-6 py-4">{post.usme_points}</td>
                          <td className="px-6 py-4">{post.usme_type}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
