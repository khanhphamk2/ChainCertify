# 1. Title: ChainCertify

![ChainCertify](Pictures\cover_image.jpg)

# 2. Product Description

## 2.1. Inspiration

In the rapidly evolving world of _web3_ applications, where decentralization and blockchain technology are revolutionizing various industries, **ChainCertify** stands as a transformative solution for candidates seeking reliable and authentic certifications.
Across sectors like education, employment, healthcare, study abroad applications, and government positions, the demand for minimum certification in application dossiers remains indispensable. These certifications serve as concrete evidence of a candidate's skills and capabilities, acting as a critical prerequisite for career advancement.
Recognizing the need for trust, transparency, and ownership in the certification process, **ChainCertify** harnesses the power of _web3_ and blockchain technology. By leveraging the immutable nature of the blockchain, **ChainCertify** ensures that certifications are securely recorded, tamper-proof, and verifiable by all relevant stakeholders.
With **ChainCertify**, candidates can confidently present their certifications, knowing that they are backed by the inherent reliability and high authenticity of blockchain technology. This innovative _web3_ application empowers candidates to take control of their career journey, providing a seamless and trustworthy platform for showcasing their skills and work/study capabilities.
Experience the future of certification with **ChainCertify**, where web3 technology meets the needs of today's dynamic and decentralized world.

## 2.2. What it does

**ChainCertify**  with three core utilities included issuance, revocation and sharing within an application based on blockchain technology platform: decentralized, trustless, high privacy.
**ChainCertify** addresses shortcomings in the issuance and revocation of certificates in centralized systems. With its decentralized nature and data integrity, this system enables us to allocate and manage certificates within a specific environment (e.g., university, ...). We can efficiently share our credentials with potential employers, ensuring swift and transparent transactions, which greatly facilitates the recruitment process.
With emerging technologies, we can securely share essential certificate information, preventing leaks of sensitive data. Issuing through smart contracts enhances transparency, verification, and guards against fraudulent issuance or revocation of certificates.

## 2.3. How we built it

**ChainCertify** project was built on _Javascript_, _Smart Contract_, _React.js_, _Ethereum_, _RSA Accumulator_.
Here is the detail application architecture:
 ![ChainCertify architecture](https://i.imgur.com/9QORd0F.png)
The general user information on the website will be stored in a database after being processed by the website's server. If a user requests certificate issuance, a smart contract will receive that request and generate a new certificate, uploading it to _IPFS_. The _Ethereum_ blockchain will store transaction details and certificate information in the form of hashes.

## 2.4. Challenges we ran into

However, our application hasn’t been completed yet.
During the development process of our **ChainCertify** project, we encountered notable obstacles due to the incomplete support of cryptography algorithms in the _Solidity_ programming language. This limitation posed significant difficulties, impeding our progress in achieving project completion.
Additionally, we’re implementing a feature called _RSA Accumulator_ which holds the promise to make the certificate management platform more secure, safe, and reliable.

## 2.5. Accomplishments that we're proud of

Although our project is still incomplete in terms of product development, the concept it brings forth holds the potential for practical application in addressing real-world issues. **ChainCertify** addresses shortcomings in the issuance and revocation of certificates in centralized systems. Our project will build a place where certificate holders and issuers can connect and communicate with each other. Users can use this place as an achievement showcase and employers will have a reliable place to verify the qualifications of the employees they need to hire. With the benefits brought by _Ethereum_’s smart contract, employers can easily and quickly verify the current status of certificates.


## 2.6. Application Domain

The issuance and revocation of certificates through an RSA Accumulator-integrated smart contract system, known as ChainCertify, holds promising potential across various domains. It offers convenience, transparency, and security to the certificate management process.

In the field of education[3]: The issuance and revocation of certificates through a smart contract system can enhance the efficient management of academic certificates for universities, professional training centers, and other educational institutions. Instead of relying on paper documents prone to loss or forgery, this system employs blockchain technology to store certificate information and securely facilitate issuance and revocation transactions. Students or learners can easily verify their certificates without direct contact with the issuing organization.
In the healthcare sector[2]: This system can also be applied to manage specialized medical certificates and prescriptions. The automated issuance and revocation process through smart contracts can save time and ensure accuracy.

The RSA Accumulator-powered certificate issuance and revocation system, ChainCertify, holds the potential for widespread application in various domains, promoting transparency, security, and convenience in managing certificates and related information.

## 2.7. Pros and Cons of Smart Contracts [1]

Smart contracts are a vital component of blockchain technology, enabling automated transactions and agreements without intermediaries, based on predefined conditions. Smart contracts are programmed and executed on the blockchain platform, ensuring the integrity and transparency of transactions.

**Benefits of Smart Contracts:**

- **Autonomy and Savings:** Smart contracts eliminate the need for intermediaries, reducing the risk of manipulation and resulting in cost savings.
- **Backup:** Data stored on the blockchain is duplicated, ensuring the ability to recover originals in case of data loss.
- **Security:** Smart contracts use encryption and cryptography to secure documents from unauthorized access.
- **Speed:** Automation through smart contracts reduces the time required for various processes.
- **Accuracy:** Smart contracts eliminate errors from manual processes, leading to more precise execution.

**Limitations of Smart Contracts:**

- **Difficult to Change:** Modifying smart contract processes is challenging; errors in the code can require time-consuming corrections.
- **Loopholes:** Ensuring ethical and fair dealings is complex with smart contracts, as terms need to be met precisely as agreed upon.
- **Third Party Involvement:** While aiming to eliminate third parties, complete removal is not feasible. Third parties assume altered roles compared to traditional contracts.
- **Vague Terms:** Smart contracts may struggle with unclear terms that rely on precise code execution.

## 2.8. ChainCertify Certificate Management System

Based on the understanding of certificate management systems and the current challenges they face, we have chosen a typical use case for certificate management: university certificate management. By utilizing smart contracts and RSA Accumulator, ChainCertify enhances transparency, data security, cost savings, accessibility, and fraud prevention.

### 2.8.1. Certificate Issuance Process

**Certificate Creation:** The Certificate Contract generates a certificate using user-provided information.
**Certificate Information Verification:** Ensures accurate certificate information.
**Proof Creation and Accumulator Update:** Creates issuance proofs and adds certificates to the RSA Accumulator for management.
**Data Upload to IPFS:** Certificate information and Accumulated Value are stored on IPFS to ensure data integrity and retrieval efficiency.
**Certificate Issuance to Holder:** Valid certificates are automatically issued to holders.

### 2.8.2. Certificate Revocation Process

**Certificate Verification:** Determines the validity and issuance status of a certificate.
**Revocation:** Upon successful verification, the smart contract generates a revocation proof and updates the RSA Accumulator's value.
**IPFS Data Update:** Updates any changed information on IPFS.
**Successful Revocation Notification.**

### 2.8.3. Interaction with RSA Accumulator

RSA Accumulator plays a continual role in the decentralized certificate and data management process.

**Certificate Issuance:**

1. System receives a request to issue a new certificate for an entity.
2. System creates certificate-related information, including recipient details and relevant data.
3. System performs encryption calculations to integrate the certificate information into the RSA Accumulator.
4. Witness and proof sets regarding certificate issuance can also be generated for later validation.
5. **Certificate Validity Verification:**

- To verify certificate validity, the system uses certificate data to compute the corresponding hash value.
- Proof and witness are used to demonstrate the existence of the certificate hash value in the RSA Accumulator.
- If proof and witness are valid, the system verifies that the certificate is unrevoked and can be accepted.

**Certificate Revocation:**

1. When a certificate needs to be revoked (e.g., expired, no longer valid), the system computes the hash value of the certificate.
2. Using deaccumulation, the system updates the accumulator to remove the certificate from the RSA Accumulator.
3. Proof and witness can be generated to demonstrate certificate revocation.

**Data Management:**

- The system is responsible for maintaining the accumulator and managing certificate-related data.
- Upon specific information requests, the system performs corresponding calculations and provides the necessary information.
- The interaction between the system and RSA Accumulator relies on encryption, integration, and proofs to securely, confidentially, and reliably manage certificates and data.

# 3. System

## 3.1. System Architecture

![System Architecture](./Pictures/ChainCertify_SystemArchitecture.png)

**Application Flow:**

- Users (Holders) or certificate issuers connect to ChainCertify.
- Smart Contracts assist Issuers and Holders in performing actions related to certificates.
- Certificates can be shared with potential employers.

**Key Components of the RSA Accumulator Contract:**

- Add Accumulator: Adds new certificates (as hashes or integers), creates proofs, and calculates a new value for the RSA Accumulator.
- Verification: Validates whether a certificate has been issued (for issuance) or is still valid (for revocation).
- Revocation: Generates revocation proofs and recalculates the value for the RSA Accumulator.
- Update Accumulated Value: Updates the value for the RSA Accumulator.
- In addition to the aforementioned key components, the RSA Accumulator also includes other components such as MemWitCreate, ProveMem, ProveNonMem, NonMemWitCreate, and more.

## 3.2. Diagrams

**User-Case:**

![User-Case](./Pictures/ChainCertify_User_case.png)

ChainCertify system consists of two main actors: Issuer and Holder:

- For the Issuer, this actor connects to the system to perform tasks such as issuing, verifying, and revoking certificates. This is achieved by providing necessary information and uploading relevant files.
- For the Holder, this actor also connects to the system using the MetaMask wallet. The Holder can view and access certificates they have been issued. Additionally, the Holder can request new certificates, verify existing ones, or revoke certificates by providing the required information. Moreover, this actor has the authority to share certificates with other users.

**Sequence Diagram:**

![Certificate Issuance Diagram](./Pictures/ChainCertify_SequenceDiagram_1.png)

The "Certificate Issuance Process" diagram illustrates the interaction between the main components within the system to process and issue certificates. The process begins when the Issuer initiates the creation of a new certificate and concludes when the system confirms the certificate status and sends a notification to the Issuer.

- Issuer: The process starts with the Issuer submitting a request to create a new certificate.

- Client: Upon receiving the request, the Client forwards it to the Smart Contract.

- Smart Contract: Upon receiving the request, the Smart Contract generates a new certificate, adds it to the RSA Accumulator, and sends the data to IPFS for storage.

- IPFS: IPFS uploads the certificate data and RSA Accumulator information and returns the result to the Smart Contract.

- Smart Contract: After receiving the result from IPFS, the Smart Contract sends the data to the blockchain.

- Blockchain: The blockchain stores transaction information, the certificate (in hash form), and the RSA Accumulator data. It then returns the result to the Smart Contract.

- Smart Contract: The Smart Contract sends the issuance result to the Client.

- Client: The Client displays a notification to the Issuer.

![Certificate Revocation Diagram](./Pictures/ChainCertify_SequenceDiagram_2.png)

The "Certificate Revocation Process" diagram illustrates the interaction between the main components within the system to process and revoke certificates. The process begins when the Issuer initiates the revocation of a certificate and concludes when the system confirms the revocation status and sends a notification to the Issuer.

- Issuer: The process starts with the Issuer submitting a request to revoke a certificate.

- Client: Upon receiving the request, the Client forwards it to the Smart Contract.

- Smart Contract: Upon receiving the request, the Smart Contract verifies the certificate, and if successful, performs the deaccumulation in the RSA Accumulator.

- If verification or revocation is unsuccessful:

  - Smart Contract sends the result to the Client.

- If verification and revocation are successful:

  - Smart Contract sends the RSA Accumulator data to IPFS.

  - IPFS uploads the RSA Accumulator data and returns the result to the Smart Contract.

  - Smart Contract sends the data to the blockchain.

  - Blockchain stores transaction information and RSA Accumulator data, then returns the result to the Smart Contract.

  - Smart Contract sends the result to the Client.

  - Client: The Client displays a notification to the Issuer.

This sequence diagram captures the steps involved in revoking a certificate, including the interactions between the Issuer, the Smart Contract, IPFS, and the blockchain. The goal is to ensure a secure and reliable process for certificate revocation.

**Regarding the technologies used in the system:**

- Smart Contract: Written in Solidity, it automates the certificate issuance process based on predefined conditions. It also securely stores issued certificate information, saving time, ensuring accuracy, and preventing unauthorized access.
- IPFS: Used for sustainable and secure data storage through distribution and encryption. IPFS accelerates data access by fetching data from nearby sources and protects data privacy and security through encryption.
- MongoDB: Improves processing speed for holder-related functionalities and reduces costs. It stores holder information such as names and other relevant details.
- RSA Accumulator: A cryptographic tool used to authenticate sets of data. It enables proving set relationships (membership, subset, etc.) to verifiers while minimizing the amount of data they need to store.

# 4. What we learned

The development of the **ChainCertify** project has been a valuable learning experience, providing us with significant insights and knowledge in the field of certificate management and blockchain technology. Here are some key takeaways from our journey:

1. Blockchain's Potential: Through the **ChainCertify** project, we have witnessed firsthand the immense potential of blockchain technology, particularly in the realm of certificate management. The decentralized and immutable nature of the blockchain has proven to be instrumental in ensuring trust, transparency, and security in the certification process.
2. Solidity and Smart Contracts: As we delved into the development of **ChainCertify**, we gained a deep understanding of Solidity, the programming language used for writing smart contracts on the Ethereum blockchain. We learned how to design and implement smart contracts to automate the issuance, revocation, and verification of certificates, enhancing the efficiency and reliability of the entire process.
3. User-Centric Design: **ChainCertify's** development journey emphasized the importance of user-centric design. We focused on creating a seamless and intuitive user interface, considering the needs and preferences of both certificate issuers and recipients. Iterative user testing and feedback helped us refine the user experience, ensuring a user-friendly platform.
4. Security Considerations: Building a secure certificate management system was a priority throughout the development process. We learned about the importance of cryptographic techniques, such as RSA Accumulator, for ensuring data integrity, privacy, and protection against fraudulent activities. Implementing robust security measures was crucial to safeguard sensitive user information.

5. Collaboration and Teamwork: The **ChainCertify** project required close collaboration among team members with diverse skill sets. We learned the importance of effective communication, coordination, and division of tasks to ensure smooth progress and timely delivery. Working together towards a common goal taught us valuable lessons in teamwork and project management.

6. Evolving Technologies: As the project progressed, we stayed updated with the latest advancements in blockchain technology and certificate management practices. Adapting to emerging technologies and incorporating them into the project allowed us to explore new possibilities and push the boundaries of innovation.

The **ChainCertify** project provided us with valuable insights into the potential of blockchain technology, the intricacies of smart contract development, the significance of user-centric design, the importance of security considerations, the power of collaboration, and the need to stay abreast of evolving technologies. These lessons learned will undoubtedly shape our future endeavors and contribute to the continuous improvement of certificate management solutions.

# 5. What's next for ChainCertify

As we look to the future of the **ChainCertify** project, our next major milestone is the complete integration of _RSA Accumulator_. This integration will further enhance the efficiency, security, and scalability of our certificate management solution. Our goal is to establish **ChainCertify** as a leading solution for secure and transparent certificate management. By fully integrating _RSA Accumulator_ and continuously evolving the platform, we aim to revolutionize the way certificates are issued, verified, and shared, providing a trusted and efficient ecosystem for individuals, organizations, and educational institutions alike.

## Demo: <https://youtu.be/bWH7eBWL6-4>

# References:

[1] "Smart contracts," Corporate Finance Institute, <https://corporatefinanceinstitute.com/resources/valuation/smart-contracts/> (accessed Aug. 20, 2023).

[2] Peterson, K.J., Deeduvanu, R., Kanjamala, P., & Mayo, K.B. (2016). A Blockchain-Based Approach to Health Information Exchange Networks.

[3] J. -C. Cheng, N. -Y. Lee, C. Chi and Y. -H. Chen, "Blockchain and smart contract for digital certificate," 2018 IEEE International Conference on Applied System Invention (ICASI), Chiba, Japan, 2018, pp. 1046-1051, doi: 10.1109/ICASI.2018.8394455.
