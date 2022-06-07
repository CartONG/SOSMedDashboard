export interface Contributor {
  name: string
  isCartONGStaff: boolean
}

export const CONTRIBUTORS: {
  developpers: Array<Contributor>,
  others: Array<Contributor>
} = {
  developpers: [
    {
      name: "Wesley Banfield",
      isCartONGStaff: false
    },
    {
      name: "Nicolas Grosjean",
      isCartONGStaff: false
    },
    {
      name: "Jean-Baptiste Regazzoni",
      isCartONGStaff: false
    },
    {
      name: "Olivier Ribiere",
      isCartONGStaff: true
    },
    {
      name: "Etienne Delclaux",
      isCartONGStaff: true
    }

  ],
  others: [
    {
      name: "Damien de Vienne (Webdesigner)",
      isCartONGStaff: false
    },
    {
      name: "Maelle Aubert (Product Owner)",
      isCartONGStaff: true
    },
    {
      name: "Clémence Beugnot (Coordinator)",
      isCartONGStaff: true
    },
    {
      name: "Sylvie  (Project Manager)",
      isCartONGStaff: true
    }
  ]
}
