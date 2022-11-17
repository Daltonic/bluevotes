const { expect } = require('chai')

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe('BlueVotes', () => {
  let Contract, contract, director, voter, result
  const OPEN = 0
  const STARTED = 1
  const ENDED = 2
  const DELETED = 3

  const id = 0
  const title = 'Miss World 2022'
  const newTitle = 'Best couples 2022'
  const image = 'https://website.com.image.jpg'
  const newImage = 'https://newimageurl.com.image.png'
  const description = 'Abandoned by their parents to die.'
  const startsAt = Date.now() + 3600 * 1000 * 24
  const endsAt = Date.now() + 3600 * 1000 * 72

  const image1 = 'https://website.com.image.jpg'
  const fullname1 = 'James Nwanem'

  const image2 = 'https://website.com.image.jpg'
  const fullname2 = 'Kelechi Nwanem'

  beforeEach(async () => {
    Contract = await ethers.getContractFactory('BlueVotes')
    ;[director, voter] = await ethers.getSigners()

    contract = await Contract.deploy()
  })

  describe('Poll', () => {
    beforeEach(async () => {
      await contract.register(image1, fullname1, {
        from: director.address,
      })
      
      await contract.createPoll(image, title, description, startsAt, endsAt, {
        from: director.address,
      })
    })

    it('Should confirm poll creation', async () => {
      result = await contract.getPolls()
      expect(result).to.have.lengthOf(1)
    })

    it('Should confirm poll update', async () => {
      result = await contract.getPoll(id)
      await contract.updatePoll(result.id, newImage, newTitle, description, startsAt, endsAt, {
        from: director.address,
      })

      result = await contract.getPoll(id)
      expect(result.title).to.equal(newTitle)
      expect(result.image).to.equal(newImage)
    })

    it('Should confirm poll delete', async () => {
      result = await contract.getPoll(id)
      expect(result.deleted).to.equal(false)

      await contract.deletePoll(result.id, {
        from: director.address,
      })

      result = await contract.getPoll(id)
      result = await contract.getPoll(id)
      expect(result.deleted).to.equal(true)
    })
  })

  describe('Candidate', () => {
    beforeEach(async () => {
      await contract.register(image1, fullname1, {
        from: director.address,
      })
      await contract.connect(voter).register(image2, fullname2)

      await contract.createPoll(image, title, description, startsAt, endsAt, {
        from: director.address,
      })
    })

    it('Should confirm ability to contest', async () => {
      await contract.contest(id, {
        from: director.address,
      })
      
      await contract.connect(voter).contest(id)

      result = await contract.listContestants(id)
      expect(result).to.have.lengthOf(2)

      result = await contract.getPoll(id)
      expect(result.contestants).to.equal(2)
    })
    
    it('Should confirm ability to vote', async () => {
      await contract.contest(id, {
        from: director.address,
      })

      result = await contract.listContestants(id)
      result = result[0]
      expect(result.voters).to.not.include(voter.address)
      expect(result.votes).to.equal(0)

      await contract.connect(voter).vote(id, result.id)
      result = await contract.listContestants(id)
      result = result[0]

      expect(result.voters).to.include(voter.address)
      expect(result.votes).to.equal(1)

      result = await contract.getPoll(id)
      expect(result.votes).to.equal(1)
    })
  })
})
