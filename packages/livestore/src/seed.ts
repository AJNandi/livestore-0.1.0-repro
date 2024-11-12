// import { BootDb, sql } from "@livestore/livestore"

import { nanoid } from "nanoid"
import { File, mutations, User, Workspace } from "./schema"


// TODO: retype this as STore and not DB
export function seed(db: any) {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const seedParam = urlParams.get("seed")
    if (seedParam == null) {
      return
    }

    const workspace: Workspace = {
      id: nanoid(),
      name: "My Workspace",
      created: Date.now(),
      modified: Date.now(),
      deleted: null,
    }

    const user: User = {
      id: nanoid(),
      email: "email@mail.com",
      name: "John Doe",
      created: Date.now(),
      modified: Date.now(),
      deleted: null,
    }

    db.txn(() => {
      db.mutate(mutations.createWorkspace(workspace))
      db.mutate(mutations.createUser(user))
      for (const file of createFiles(100, workspace.id)) {
        db.mutate(mutations.createFileWithWorkspace(file))
      }
    })

    console.log("SEEDING DONE")
  } finally {
    // remove `?seed=` from the URL using the URLSearchParams API
    const url = new URL(window.location.href)
    url.searchParams.delete("seed")
    window.history.replaceState({}, "", url.toString())
  }
}

export function* createFiles(numTasks: number, workspaceId: string): Generator<File> {
  const fileNames = [
    "Budget_Tracker",
    "Project_Roadmap",
    "Expense_Summary",
    "Team_Task_Planner",
    "Sales_Data_Overview",
    "Client_Contact_List",
    "Inventory_Management",
    "Marketing_Plan",
    "Annual_Financial Report",
    "Employee_Timesheets",
    "Monthly_Goals_Tracker",
    "Quarterly_Performance",
    "Product_Launch Schedule",
    "Customer_Feedback_Log",
    "Tax_Preparation",
    "Resource_Allocation",
    "Workforce_Attendance",
    "Content_Calendar",
    "Training_Schedule",
    "Vendor_Price_List",
  ]

  const companyNames = [
    "Evergreen_Solutions",
    "Skyline_Innovations",
    "Quantum_Dynamics",
    "FusionWorks",
    "StellarPath_Technologies",
    "BlueWave_Ventures",
    "NexGen_Analytics",
    "Ironclad_Industries",
    "BrightStream_Media",
    "Orion_Systems",
    "Vertex_Global",
    "CrystalByte_Labs",
    "EchoStream_Enterprises",
    "SynergyTech",
    "Zenith_Horizons",
    "PulseGrid_Networks",
    "Lumenix_Solutions",
    "Axion_Technologies",
    "NovaSphere_Enterprises",
    "Infinite_Loop_Consulting",
  ]

  const fileSuffixes = [
    "_v1",
    "_v2",
    "_FINAL",
    "_UPDATED",
    "_Draft",
    "_backup",
    "_old",
    "_v3",
    "_edited",
    "_revised",
    "_v4",
    "_latest",
    "_FINAL2",
    "_temp",
    "_copy",
    "_archived",
    "_v5",
    "_reviewed",
    "_clean",
    "_FINAL_FINAL",
  ]

  const getRandomItem = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)]!

  const generateText = () => {
    const company = getRandomItem(companyNames)
    const fileName = getRandomItem(fileNames)
    const suffix = getRandomItem(fileSuffixes)
    return `${company}${fileName}${suffix}`
  }

  const now = Date.now()
  const ONE_DAY = 24 * 60 * 60 * 1000
  for (let i = 0; i < numTasks; i++) {
    const name = generateText()
    const file = {
      id: nanoid(),
      name,
      created: now - i * 5 * ONE_DAY,
      modified: now - i * 2 * ONE_DAY,
      deleted: null,
      workspaceId,
    }
    yield file
  }
}
