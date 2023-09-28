export interface Contributor {
  contribution?: string
  firstName: string
  isCartONGStaff: boolean
  lastName: string
}

export const CONTRIBUTORS: {
  developers: Array<Contributor>,
  others: Array<Contributor>
} = {
  developers: [
    {
      firstName: "Wesley",
      isCartONGStaff: false,
      lastName: "Banfield"
    },
    {
      firstName: "Nicolas",
      isCartONGStaff: false,
      lastName: "Grosjean"
    },
    {
      firstName: "Jean-Baptiste",
      isCartONGStaff: false,
      lastName: "Regazzoni"
    },
    {
      firstName: "Olivier",
      isCartONGStaff: true,
      lastName: "Ribiere"
    },
    {
      firstName: "Etienne",
      isCartONGStaff: true,
      lastName: "Delclaux"
    }

  ],
  others: [
    {
      contribution: "Webdesigner",
      firstName: "Damien",
      isCartONGStaff: false,
      lastName: " De Vienne"
    },
    {
      contribution: "Product Owner",
      firstName: "Maelle",
      isCartONGStaff: true,
      lastName: "Aubert"
    },
    {
      contribution: "Coordinator",
      firstName: "Clémence",
      isCartONGStaff: true,
      lastName: "Beugnot"
    },
    {
      contribution: "Project Manager",
      firstName: "Sylvie",
      isCartONGStaff: true,
      lastName: "Chollet"
    }
  ]
}
