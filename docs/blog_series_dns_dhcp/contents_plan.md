### **2300 - Digging Into DDI**

**Base Content:**

- Introduction to DDI: DNS, DHCP, and IPAM as core network services.

**Expanded Coverage:**

- DDI integration helps in centralized management and automation of IP space and DNS/DHCP services.
- Practical importance: Essential for scaling, managing, and securing enterprise networks.
- Real-world usage: Automates IP assignments, detects conflicts, and enables fast troubleshooting using IPAM metadata.

---

### **2301 - Common DNS Server and Client Software Overview**

**Base Content:**

- Overview of server software (BIND, djbdns, etc.) and tools (Dig, Host, Nslookup).

**Expanded Coverage:**

- **BIND**: The most commonly used DNS server software; highly configurable.
- **Unbound**: Used primarily for recursive DNS resolution with DNSSEC support.
- **Dnsmasq**: Lightweight, often used in embedded systems.
- **Infoblox DNS**: Enterprise-grade DNS, integrates tightly with IPAM/DHCP.
- Tools:

  - `dig`: Preferred for querying DNS servers. Syntax: `dig @server name type`.
  - `nslookup`: Useful but deprecated in favor of `dig`.
  - `host`: Simplified DNS query tool.
  - `ping`: Helps test hostname resolution and latency.

- Troubleshooting best practice: Always use `dig` for detailed traceability and query output.

---

### **2302 - Learning About DNS Resource Records**

**Base Content:**

- Resource record (RR) types and message format.

**Expanded Coverage:**

- **Common RR types**:

  - `A`: IPv4 address.
  - `AAAA`: IPv6 address.
  - `CNAME`: Canonical name (alias).
  - `MX`: Mail exchange.
  - `NS`: Delegation to name servers.
  - `SOA`: Marks start of a zone.

- **Less common RR types**:

  - `SRV`: Service location for SIP, LDAP, etc.
  - `TXT`: Human-readable data, often used for SPF/DKIM.
  - `CAA`: Specifies which CAs can issue certs (prevents mis-issuance).

- **Message format**: Header (ID, flags), Question, Answer, Authority, Additional.
- TTL: Key to caching behavior and performance.

---

### **2303 - Exploring DNS Authoritative Data**

**Base Content:**

- Root name servers, domain registration, zone transfers.

**Expanded Coverage:**

- **Root Servers**: 13 logical servers (A–M), form the DNS root zone.
- **Zone Transfers**:

  - AXFR: Full zone transfer.
  - IXFR: Incremental zone transfer.

- **Authoritative Name Servers**: Have the final say over a zone; respond with AA flag.
- **Name Server (NS) records**: Delegate domain control to authoritative servers.
- **Practical Use**: Use `dig +norecurse` to test if a server is authoritative.

---

### **2304 - Exploring Zones and Delegation**

**Covered Topics:**

- Types of zones: forward-mapping vs reverse-mapping
- Subzones and delegation
- Minimum zone requirements
- Lame delegations and their impact

**Expanded Topics:**

- **Zone File Components**: SOA, NS, A, PTR, MX, CNAME records
- **Delegation Best Practices**: How to properly delegate subdomains using NS records and glue records to prevent resolution failures.
- **Reverse Delegation**: Importance of PTR records and how ISPs handle reverse zone delegation.
- **Lame Delegation Detection**: Use of tools like `dig +trace` to identify broken delegation chains.

---

### **2305 - Learning about Query and Caching**

**Covered Topics:**

- DNS communication basics
- TTL and cache behavior
- Authoritative vs non-authoritative answers

**Expanded Topics:**

- **Cache Poisoning Vulnerabilities**: Examples like the Kaminsky attack and how DNSSEC helps mitigate this.
- **TTL Optimization**: Impacts on performance and propagation delay.
- **Negative Caching**: Use of SOA's MINIMUM field in NXDOMAIN responses.

---

### **2306 - Learning about Forwarding and Query Path**

**Covered Topics:**

- Standard and conditional forwarding
- Delegation vs forwarding
- Advanced query paths

**Expanded Topics:**

- **DNS Forwarding Use Cases**: When to use forwarding vs direct recursion (e.g., in split-horizon DNS or branch office setups).
- **Forwarding Loops and Failures**: How to diagnose and prevent them using logging and TTL constraints.
- **Hybrid Query Models**: Where some queries are forwarded while others are resolved via root hints.

---

### **2307 - Exploring ACLs and DNS Views**

**Covered Topics:**

- Access Control Lists (ACLs)
- DNS Views

**Expanded Topics:**

- **Use Cases for DNS Views**: Split-horizon DNS, geo-targeting, internal vs external resolution.
- **ACL Implementation**: Syntax and order of evaluation in BIND/Infoblox, how to use them to restrict zone transfers and recursion.

---

### **2308 - Learning about DHCP Messages**

**Covered Topics:**

- DHCPv4 message types
- Relay agent behavior

**Expanded Topics:**

- **DHCPv4 Four-Step Process (DORA)**: Discover, Offer, Request, Acknowledgement.
- **BOOTP Flags and Fields**:

  - `chaddr`: Client hardware address (MAC).
  - `ciaddr`: Client IP address if already assigned.
  - `yiaddr`: IP address being offered.
  - `siaddr`: Next server to use in bootstrap.

- **Relay Agent IP (giaddr)**: Used for relaying requests between networks.

---

### **2309 - Exploring DHCP Objects**

**Covered Topics:**

- Networks, ranges, exclusions, manual allocations, policies

**Expanded Topics:**

- **Network Object**: Contains range, exclusion, and reservation info.
- **Range vs Exclusion**: Dynamic IP pool vs reserved IPs not to be leased.
- **Manual Allocations**: Reserved IPs tied to MAC addresses.
- **Policies**: Match criteria like vendor class or user class.

---

### **2310 - Exploring DHCP Timers and Lease States**

**Covered Topics:**

- Lease ordering and timers
- DHCP lease states (FREE, ACTIVE, EXPIRED, etc.)

**Expanded Topics:**

- **Lease Timers**:

  - **T1 (Renewal Time)**: Default 50% of lease duration.
  - **T2 (Rebinding Time)**: Default 87.5% of lease duration.
  - **Lease Time**: Total duration an address is valid.

- **Lease Lifecycle**:

  - **FREE**: Available for assignment.
  - **ACTIVE**: Assigned to a client.
  - **EXPIRED**: Lease time ended, pending reuse.
  - **RELEASED**: Client released the lease.
  - **RESET**: Admin manually freed it.
  - **ABANDONED**: IP conflict detected, address blacklisted.

- **DHCPv6 Lease Considerations**: Includes preferred and valid lifetimes; can be infinite (`0xffffffff`).

---

### **2311 - Exploring DHCP Options**

**Covered Topics:**

- Basics of DHCP options
- Vendor-specific options
- DHCPv6-specific options

**Expanded Topics:**

- **Common DHCPv4 Options**:

  - `Option 1`: Subnet mask
  - `Option 3`: Default gateway
  - `Option 6`: DNS servers
  - `Option 15`: Domain name

- **Vendor-Specific Options**:

  - `Option 43`: Often used for PXE boot or VoIP phones.
  - **Option 60**: Vendor Class Identifier, used with policies.

- **Undefined/Custom Options**: Manual option definitions using code and data type.
- **DHCP Option Order**: Critical in matching and delivering correct config.

---

### **2312 - Learning about Dynamic DNS (DDNS)**

**Covered Topics:**

- DHCP Option 81
- DDNS update process
- Best practices

**Expanded Topics:**

- **DHCP Option 81 (FQDN Option)**:

  - `0`: Client does not request updates.
  - `1`: Client requests server to update both A and PTR.
  - `3`: Client performs A, requests server for PTR.

- **Update Methods**:

  - **Secure**: Authenticated updates (typically in AD-integrated DNS).
  - **Non-secure**: Anyone can submit updates — vulnerable.

- **Best Practices**:

  - Use secure updates where possible.
  - Configure appropriate DNS scavenging to clean stale records.

---

### **2313 - Troubleshooting Tips**

**Covered Topics:**

- DHCP and DNS troubleshooting
- Relay agents and rogue servers
- Split authority issues

**Expanded Topics:**

- **Common DNS Issues**:

  - Wrong forwarders, stale cache, split horizon mismatches.
  - Use `dig +trace`, `nslookup`, and packet captures.

- **Common DHCP Issues**:

  - No lease: check server scope, exclusions, and relay.
  - Conflicts: verify with ARP checks or pings.

- **Relay Agent Debugging**: Use `giaddr` and logs to trace path.
- **Rogue DHCP Detection**:

  - Monitor unexpected DHCP offers with Wireshark.
  - Block rogue servers with switch-level port security.

---

### **2314 - Interpreting Redundancy and Reliability**

**Covered Topics:**

- Fault tolerance, load balancing
- DHCP failover, DNS Anycast

**Expanded Topics:**

- **DHCP Failover Protocol**:

  - Load balancing mode vs Hot-standby.
  - Message types: `UPDATE`, `STATE`, `BULKLEASEQUERY`.

- **Split Scope**: Divide IP ranges between two independent servers.
- **DNS Anycast**:

  - Uses same IP across multiple locations for low-latency failover.
  - Requires BGP or similar routing control.

- **Zone Transfer Redundancy**:

  - Multiple secondary servers.
  - NOTIFY messages to speed up updates.

---

### **2315 - Learning about DNS and DHCP Security**

**Covered Topics:**

- Security concerns with DNS/DHCP
- DNSSEC and rogue server prevention

**Expanded Topics:**

- **DNSSEC**:

  - Provides origin authentication, data integrity, and authenticated denial.
  - Involves RRSIG, DNSKEY, DS, and NSEC/NSEC3.

- **DNS Cache Poisoning Mitigation**:

  - Use randomized query IDs and source ports.
  - Prefer DNSSEC-validating resolvers.

- **DHCP Snooping**: Switch-based protection against rogue DHCP servers.
- **ARP Inspection**: Paired with snooping to prevent MAC spoofing.

---

### **2316 - Interpreting Metadata Design**

**Covered Topics:**

- Designing metadata fields
- Logical format and best practices

**Expanded Topics:**

- **Metadata Use Cases**:

  - Tagging subnets, IPs, and DNS zones for automation and reporting.
  - Policy application based on site, device type, or service role.

- **Metadata Naming Conventions**:

  - Use clear and standardized names.
  - Avoid reserved characters and keep keys lowercase.

- **Hierarchical Metadata**:

  - Use inheritance to propagate metadata to child objects (e.g., IP blocks to IPs).

---

### **2317 - Learning about API and Automation**

**Covered Topics:**

- API basics
- Automation of tasks like provisioning

**Expanded Topics:**

- **Common API Tasks**:

  - Create DHCP reservations, DNS records, assign metadata.

- **RESTful API Operations**:

  - CRUD operations (`GET`, `POST`, `PUT`, `DELETE`)
  - Use of token-based or basic auth.

- **Automation Tools**:

  - Ansible, Python SDKs, Terraform for IPAM/DNS/DHCP.

- **Change Control**:

  - API calls should log changes to assist in rollback or audit trails.

---

### **2318 - Learning about DDI Security**

**Covered Topics:**

- IPAM's role in security and DDI integration

**Expanded Topics:**

- **IPAM as a Security Tool**:

  - Central source of truth for IP asset management.
  - Helps detect shadow IT, stale allocations.

- **Integration with SIEM/NAC Tools**:

  - Enrich security logs with asset identity and IP details.

- **DDI in Incident Response**:

  - Identify device history via IP assignment logs.
  - Use DHCP logs for forensic tracking.
