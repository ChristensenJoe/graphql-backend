import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const authorData = [
  {
    name: 'Stephen King',
    books: {
      create: [
        {
          title: 'The Shining',
        },
        {
          title: 'Carrie',
        },
        {
          title: 'It',
        }
      ]
    }
  },
  {
    name: 'Agatha Christie',
    books: {
      create: [
        {
          title: 'Death on the Nile'
        },
        {
          title: 'Crooked House'
        },
        {
          title: 'Murder on the Orient Express'
        }
      ]
    }
  },
  {
    name: 'Franz Kafka',
    books: {
      create: [
        {
          title: 'The Trial',
        },
        {
          title: 'The Metamorphosis'
        }
      ]
    }
  },
  {
    name: 'Albert Camus',
    books: {
      create: [
        {
          title: 'The Stranger'
        }
      ]
    }
  }
]

async function main() {
  console.log('Start seeding ...')
  console.log('-----------------')
  await Promise.all(authorData?.map(async author => {
    const createdAuthor = await prisma.author.create({
      data: author,
      include: { books: true }
    })

    console.log(`Created author with id: ${createdAuthor.id}`)

    createdAuthor?.books?.forEach(book => console.log(`Created book with id: ${book.id}`))
  }) || [])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(() => {
    console.log('-----------------')
    console.log('Seeding finished.')
  })
